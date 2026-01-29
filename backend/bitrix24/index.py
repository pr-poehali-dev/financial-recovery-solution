import json
import os
import urllib.request
import urllib.parse
from datetime import datetime
# v3 - new webhook

def handler(event: dict, context) -> dict:
    """Отправка лидов в Битрикс24 CRM через webhook"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        name = body.get('name', '')
        phone = body.get('phone', '')
        email = body.get('email', '')
        city = body.get('city', '')
        debt_amount = body.get('debt_amount', '')
        comment = body.get('comment', '')
        form_type = body.get('form_type', 'consultation')
        
        if not name or not phone:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Имя и телефон обязательны'})
            }
        
        webhook_url = os.environ.get('BITRIX24_WEBHOOK_URL')
        if not webhook_url:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Webhook URL не настроен'})
            }
        
        webhook_url = webhook_url.replace('/profile.json', '').rstrip('/')
        print(f"Bitrix24: Отправка лида. Имя: {name}, Телефон: {phone}, Тип формы: {form_type}")
        
        title = f"Заявка с сайта: {name}"
        if form_type == 'appointment':
            title = f"Запись на встречу: {name}"
        
        description_parts = []
        if phone:
            description_parts.append(f"Телефон: {phone}")
        if email:
            description_parts.append(f"Email: {email}")
        if city:
            description_parts.append(f"Город: {city}")
        if debt_amount:
            description_parts.append(f"Сумма задолженности: {debt_amount}")
        if comment:
            description_parts.append(f"Комментарий: {comment}")
        description_parts.append(f"Тип формы: {form_type}")
        description_parts.append(f"Дата: {datetime.now().strftime('%d.%m.%Y %H:%M')}")
        
        lead_data = {
            'TITLE': title,
            'NAME': name,
            'PHONE': [{'VALUE': phone, 'VALUE_TYPE': 'WORK'}],
            'COMMENTS': '\n'.join(description_parts),
            'SOURCE_ID': 'WEB',
            'SOURCE_DESCRIPTION': 'Сайт ВИТАКОН'
        }
        
        if email:
            lead_data['EMAIL'] = [{'VALUE': email, 'VALUE_TYPE': 'WORK'}]
        
        api_url = f"{webhook_url}/crm.lead.add.json"
        print(f"Bitrix24: API URL: {api_url}")
        
        params = {}
        for key, value in lead_data.items():
            if isinstance(value, list):
                for i, item in enumerate(value):
                    for item_key, item_value in item.items():
                        params[f'fields[{key}][{i}][{item_key}]'] = item_value
            else:
                params[f'fields[{key}]'] = value
        
        data = urllib.parse.urlencode(params).encode('utf-8')
        
        req = urllib.request.Request(api_url, data=data, method='POST')
        req.add_header('Content-Type', 'application/x-www-form-urlencoded')
        
        print(f"Bitrix24: Отправка запроса...")
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"Bitrix24: Ответ получен: {result}")
            
            if result.get('result'):
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'lead_id': result['result'],
                        'message': 'Заявка успешно отправлена'
                    })
                }
                print(f"Bitrix24: Лид создан успешно, ID: {result['result']}")
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'lead_id': result['result'],
                        'message': 'Заявка успешно отправлена'
                    })
                }
            else:
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': False,
                        'error': result.get('error_description', 'Ошибка при создании лида')
                    })
                }
    
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Некорректный JSON'})
        }
    except urllib.error.URLError as e:
        print(f"Bitrix24 URL Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': f'Ошибка подключения к Bitrix24: {str(e)}'
            })
        }
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        try:
            error_data = json.loads(error_body)
            error_msg = error_data.get('error_description', error_data.get('error', 'HTTP Error'))
        except:
            error_msg = error_body[:200]
        
        print(f"Bitrix24 HTTP Error: {e.code} - {error_msg}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': f'Ошибка Bitrix24: {error_msg}'
            })
        }
    except Exception as e:
        print(f"Bitrix24 Error: {type(e).__name__} - {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': f'Ошибка сервера: {str(e)}'
            })
        }
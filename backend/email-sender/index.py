import json
import os
import urllib.request
import urllib.parse
from datetime import datetime

def handler(event: dict, context) -> dict:
    """Отправка заявок с форм в Telegram"""
    
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
        email_from = body.get('email', '')
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
        
        phone_digits = phone.replace('+', '').replace(' ', '').replace('-', '').replace('(', '').replace(')', '')
        if len(phone_digits) != 11:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Телефон должен содержать 11 цифр'})
            }
        
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        if not bot_token or not chat_id:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Заявка получена (Telegram не настроен)',
                    'warning': 'Добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID для уведомлений'
                })
            }
        
        form_title = 'Консультация' if form_type == 'consultation' else 'Запись на встречу'
        
        message_parts = [
            f"🔔 <b>Новая заявка: {form_title}</b>",
            f"",
            f"👤 <b>Имя:</b> {name}",
            f"📱 <b>Телефон:</b> {phone}"
        ]
        
        if email_from:
            message_parts.append(f"📧 <b>Email:</b> {email_from}")
        
        if city:
            message_parts.append(f"🏙 <b>Город:</b> {city}")
        
        if debt_amount:
            message_parts.append(f"💰 <b>Сумма долга:</b> {debt_amount} ₽")
        
        if comment:
            message_parts.append(f"💬 <b>Комментарий:</b> {comment}")
        
        message_parts.append(f"")
        message_parts.append(f"⏰ {datetime.now().strftime('%d.%m.%Y %H:%M')}")
        
        message_text = '\n'.join(message_parts)
        
        telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        
        params = {
            'chat_id': chat_id,
            'text': message_text,
            'parse_mode': 'HTML'
        }
        
        data = urllib.parse.urlencode(params).encode('utf-8')
        req = urllib.request.Request(telegram_url, data=data, method='POST')
        
        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                result = json.loads(response.read().decode('utf-8'))
                
                if result.get('ok'):
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'success': True,
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
                            'error': f"Ошибка Telegram API: {result.get('description', 'Unknown error')}"
                        })
                    }
        except Exception as telegram_error:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': f'Ошибка отправки в Telegram: {str(telegram_error)}'
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
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'})
        }

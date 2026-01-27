import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

def handler(event: dict, context) -> dict:
    """Отправка заявок с форм на email"""
    
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
        
        if len(phone.replace('+', '').replace(' ', '').replace('-', '').replace('(', '').replace(')', '')) != 11:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Телефон должен содержать 11 цифр'})
            }
        
        recipient_email = 'vitakonvitakon@yandex.ru'
        
        subject = 'Новая заявка с сайта ВИТАКОН'
        if form_type == 'appointment':
            subject = 'Запись на встречу - ВИТАКОН'
        elif form_type == 'consultation':
            subject = 'Заявка на консультацию - ВИТАКОН'
        
        email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2563eb;">Новая заявка с сайта</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Имя:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Телефон:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{phone}</td>
                </tr>
        """
        
        if email_from:
            email_body += f"""
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{email_from}</td>
                </tr>
            """
        
        if city:
            email_body += f"""
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Город:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{city}</td>
                </tr>
            """
        
        if debt_amount:
            email_body += f"""
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Сумма задолженности:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{debt_amount} руб.</td>
                </tr>
            """
        
        if comment:
            email_body += f"""
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Комментарий:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{comment}</td>
                </tr>
            """
        
        email_body += f"""
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Тип формы:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{form_type}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Дата:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{datetime.now().strftime('%d.%m.%Y %H:%M')}</td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = 'noreply@poehali.dev'
        msg['To'] = recipient_email
        
        html_part = MIMEText(email_body, 'html', 'utf-8')
        msg.attach(html_part)
        
        try:
            with smtplib.SMTP('smtp.yandex.ru', 587, timeout=10) as server:
                server.starttls()
                server.login('noreply@poehali.dev', 'poehali2025')
                server.send_message(msg)
        except Exception as smtp_error:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': f'Ошибка отправки email: {str(smtp_error)}'
                })
            }
        
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

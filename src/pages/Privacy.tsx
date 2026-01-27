import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="font-semibold"
          >
            ← Вернуться на главную
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Общие положения</h2>
            <p className="text-muted-foreground leading-relaxed">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта ВИТАКОН (далее — «Сайт»). 
              Используя Сайт, вы соглашаетесь с условиями данной Политики конфиденциальности.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Оператор персональных данных: ООО "ВИТАКОН", ИНН 7451388149, ОГРН 1157451003973.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Собираемые данные</h2>
            <p className="text-muted-foreground leading-relaxed">
              При использовании Сайта мы можем собирать следующую информацию:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Имя и фамилия</li>
              <li>Контактный телефон</li>
              <li>Адрес электронной почты</li>
              <li>Информация о сумме задолженности</li>
              <li>Дополнительная информация, предоставленная в форме обратной связи</li>
              <li>Данные о посещении сайта (IP-адрес, браузер, время визита)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. Цели обработки данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Мы используем ваши персональные данные для:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Предоставления консультаций по вопросам банкротства</li>
              <li>Связи с вами для уточнения деталей заявки</li>
              <li>Оказания юридических услуг</li>
              <li>Улучшения качества обслуживания</li>
              <li>Анализа эффективности работы Сайта</li>
              <li>Выполнения требований законодательства РФ</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Защита персональных данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Мы принимаем необходимые организационные и технические меры для защиты ваших персональных данных от неправомерного доступа, 
              уничтожения, изменения, блокирования, копирования и распространения.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Доступ к персональным данным имеют только уполномоченные сотрудники компании, которые обязаны соблюдать конфиденциальность.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Передача данных третьим лицам</h2>
            <p className="text-muted-foreground leading-relaxed">
              Мы не передаем ваши персональные данные третьим лицам, за исключением случаев:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Получения вашего явного согласия</li>
              <li>Требования законодательства РФ</li>
              <li>Необходимости для оказания юридических услуг (передача в суды, государственные органы)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Использование cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Сайт использует файлы cookies для улучшения работы и анализа посещаемости. 
              Cookies — это небольшие текстовые файлы, которые сохраняются на вашем устройстве.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Вы можете отключить cookies в настройках браузера, однако это может ограничить функциональность Сайта.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7. Ваши права</h2>
            <p className="text-muted-foreground leading-relaxed">
              Вы имеете право:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Получать информацию о обработке ваших персональных данных</li>
              <li>Требовать уточнения, блокирования или удаления персональных данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия оператора в Роскомнадзоре или суде</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Для реализации ваших прав свяжитесь с нами по телефону 8 (800) 600-19-74.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">8. Срок хранения данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, 
              но не менее срока, установленного законодательством РФ.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">9. Изменения в Политике</h2>
            <p className="text-muted-foreground leading-relaxed">
              Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
              Актуальная версия всегда доступна на данной странице.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">10. Контакты</h2>
            <p className="text-muted-foreground leading-relaxed">
              По вопросам обработки персональных данных обращайтесь:
            </p>
            <ul className="list-none space-y-2 text-muted-foreground pl-0">
              <li><strong>Телефон:</strong> 8 (800) 600-19-74</li>
              <li><strong>Адрес:</strong> г. Курган, ул. Пичугина, стр. 9, пом. 1, офис 221</li>
              <li><strong>ИНН:</strong> 7451388149</li>
              <li><strong>ОГРН:</strong> 1157451003973</li>
            </ul>
          </section>

          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Дата последнего обновления: 27 января 2026 года
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button 
            onClick={() => navigate('/')}
            size="lg"
            className="bg-primary text-primary-foreground"
          >
            Вернуться на главную
          </Button>
        </div>
      </div>

      <footer className="bg-primary text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-white/60">
          <p>© 2026 ВИТАКОН. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

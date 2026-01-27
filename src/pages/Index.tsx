import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="https://cdn.poehali.dev/projects/6cdfb7b2-7eb0-42cf-baf5-e1e9e6b2a420/bucket/75b721cd-a4fd-4863-ac89-f2576f26f136.png" alt="ВИТАКОН" className="h-12" />
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#advantages" className="text-foreground hover:text-primary transition-colors">Преимущества</a>
            <a href="#debts" className="text-foreground hover:text-primary transition-colors">Типы долгов</a>
            <a href="#reviews" className="text-foreground hover:text-primary transition-colors">Отзывы</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Консультация
          </Button>
        </div>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-foreground">
                Банкротство физических лиц
              </h1>
              <p className="text-xl text-muted-foreground">
                Списываем ваши долги абсолютно законно. Банкротство с прозрачными условиями.
              </p>
              <div className="flex items-center gap-3 bg-secondary/20 p-4 rounded-lg border-l-4 border-secondary">
                <Icon name="ShieldCheck" size={32} className="text-secondary" />
                <p className="text-sm font-semibold text-foreground">
                  Если суд откажет — вернем деньги согласно договору. В соответствии с Федеральным законом №127-ФЗ
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
                >
                  Получить консультацию
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-lg px-8"
                >
                  Узнать стоимость
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Предложим решение конкретно для вашей ситуации</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={24} className="text-secondary flex-shrink-0 mt-1" />
                    <p className="text-white/90">Остановим звонки коллекторов, банков и МФО</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={24} className="text-secondary flex-shrink-0 mt-1" />
                    <p className="text-white/90">Работаем со сложными случаями, в т.ч. с ипотекой/автокредитом</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={24} className="text-secondary flex-shrink-0 mt-1" />
                    <p className="text-white/90">Удобная рассрочка без скрытых платежей</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-extrabold text-secondary">750+</div>
              <p className="text-lg text-white/90">Помогли клиентам с 2015 года</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-extrabold text-secondary">1+ млрд ₽</div>
              <p className="text-lg text-white/90">Освободились от долгов на сумму</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-extrabold text-secondary">от 300k ₽</div>
              <p className="text-lg text-white/90">Работаем с суммой долга</p>
            </div>
          </div>
        </div>
      </section>

      <section id="advantages" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Почему выбирают нас
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            37 офисов по всей России. Опыт работы с 2015 года
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "UserCheck",
                title: "Индивидуальный подход",
                description: "Предложим решение конкретно для вашей ситуации"
              },
              {
                icon: "PhoneOff",
                title: "Остановим коллекторов",
                description: "Прекратим звонки коллекторов, банков и МФО"
              },
              {
                icon: "Building2",
                title: "Сложные случаи",
                description: "Работаем со сложными случаями, в т.ч. с ипотекой и автокредитом"
              },
              {
                icon: "CreditCard",
                title: "Удобная рассрочка",
                description: "Прозрачные условия без скрытых платежей"
              }
            ].map((item, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Icon name={item.icon} size={32} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="debts" className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            От каких долгов можно избавиться?
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Юридическая процедура, предусмотренная законодательством РФ
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "Banknote",
                title: "Долги по кредитам и микрозаймам",
                color: "text-primary"
              },
              {
                icon: "CreditCard",
                title: "Долги по кредитным картам",
                color: "text-secondary"
              },
              {
                icon: "HandCoins",
                title: "Долги по распискам и займам у физлиц",
                color: "text-primary"
              },
              {
                icon: "FileText",
                title: "Долги по налогам, взносам, штрафам",
                color: "text-secondary"
              },
              {
                icon: "Home",
                title: "Долги по коммунальным платежам (ЖКХ)",
                color: "text-primary"
              },
              {
                icon: "ShieldCheck",
                title: "Другие виды задолженностей",
                color: "text-secondary"
              }
            ].map((item, index) => (
              <Card key={index} className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={28} className={item.color} />
                  </div>
                  <p className="text-lg font-semibold text-foreground pt-2">{item.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Видеоотзывы наших клиентов
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Реальные истории людей, которым мы помогли
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <Icon name="Play" size={32} className="text-primary ml-1" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-2">Видеоотзыв клиента</p>
                  <p className="text-sm text-muted-foreground">
                    История успешного банкротства и освобождения от долгов
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Узнайте стоимость банкротства
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Ответьте на несколько простых вопросов
            </p>
            <div className="bg-secondary/10 border-2 border-dashed border-secondary rounded-xl p-12 text-center">
              <Icon name="Calculator" size={48} className="text-secondary mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">
                Здесь будет размещён код калькулятора
              </p>
              <p className="text-muted-foreground">
                Вставьте код вашей формы в этот блок
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Получите бесплатную консультацию
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Оставьте заявку и мы свяжемся с вами в течение 15 минут
              </p>
              <Card className="border-2">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Ваше имя</label>
                    <Input placeholder="Иван Иванов" className="border-2" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Телефон</label>
                    <Input placeholder="+7 (___) ___-__-__" className="border-2" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Сумма задолженности</label>
                    <Input placeholder="Например, 500 000 ₽" className="border-2" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Комментарий</label>
                    <Textarea placeholder="Опишите вашу ситуацию" rows={4} className="border-2" />
                  </div>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg py-6">
                    Отправить заявку
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </CardContent>
              </Card>
            </div>

            <div id="appointment">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Запишитесь на встречу
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                37 офисов по всей России
              </p>
              <Card className="border-2 mb-6">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Ваше имя</label>
                    <Input placeholder="Иван Иванов" className="border-2" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Email</label>
                    <Input type="email" placeholder="example@mail.ru" className="border-2" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Город</label>
                    <Input placeholder="Москва" className="border-2" />
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6">
                    Записаться
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Телефон</p>
                    <p className="text-muted-foreground">+7 (800) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">info@vitakon.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Адрес</p>
                    <p className="text-muted-foreground">37 офисов по всей России</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-secondary">ВИТАКОН</h3>
              <p className="text-white/80">
                Юридическая компания по банкротству физических лиц. Работаем с 2015 года.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-white/80">
                <p>+7 (800) 123-45-67</p>
                <p>info@vitakon.ru</p>
                <p>37 офисов по всей России</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Информация</h4>
              <div className="space-y-2 text-white/80">
                <p>Работаем согласно ФЗ №127-ФЗ</p>
                <p>Лицензия на осуществление деятельности</p>
                <p>Политика конфиденциальности</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>© 2024 ВИТАКОН. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
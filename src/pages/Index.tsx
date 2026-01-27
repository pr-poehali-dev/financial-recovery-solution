import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const { toast } = useToast();
  const [consultationForm, setConsultationForm] = useState({ name: '', phone: '', debt_amount: '', comment: '' });
  const [quizForm, setQuizForm] = useState({ debt_amount: '', collectors: '', debt_types: [] as string[], name: '', phone: '' });
  const [quizStep, setQuizStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConsultationSubmit = async () => {
    if (!consultationForm.name || !consultationForm.phone) {
      toast({ title: 'Ошибка', description: 'Заполните имя и телефон', variant: 'destructive' });
      return;
    }
    
    const phoneDigits = consultationForm.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      toast({ title: 'Ошибка', description: 'Телефон должен содержать 11 цифр', variant: 'destructive' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('https://functions.poehali.dev/5d2315a8-cefe-44db-a82e-41d5eb1a5c2d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...consultationForm, form_type: 'consultation' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({ title: 'Успешно!', description: 'Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.' });
        setConsultationForm({ name: '', phone: '', debt_amount: '', comment: '' });
      } else {
        toast({ title: 'Ошибка', description: result.error || 'Не удалось отправить заявку', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отправить заявку. Попробуйте позже.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuizSubmit = async () => {
    if (!quizForm.debt_amount || !quizForm.collectors || quizForm.debt_types.length === 0) {
      toast({ title: 'Ошибка', description: 'Заполните все вопросы', variant: 'destructive' });
      return;
    }
    if (!quizForm.name || !quizForm.phone) {
      toast({ title: 'Ошибка', description: 'Заполните имя и телефон', variant: 'destructive' });
      return;
    }
    
    const phoneDigits = quizForm.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      toast({ title: 'Ошибка', description: 'Телефон должен содержать 11 цифр', variant: 'destructive' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('https://functions.poehali.dev/5d2315a8-cefe-44db-a82e-41d5eb1a5c2d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...quizForm, 
          debt_types: quizForm.debt_types.join(', '),
          comment: `Сумма долга: ${quizForm.debt_amount}, Коллекторы: ${quizForm.collectors}, Задолженности: ${quizForm.debt_types.join(', ')}`,
          form_type: 'quiz' 
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({ title: 'Успешно!', description: 'Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.' });
        setQuizForm({ debt_amount: '', collectors: '', debt_types: [], name: '', phone: '' });
      } else {
        toast({ title: 'Ошибка', description: result.error || 'Не удалось отправить заявку', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отправить заявку. Попробуйте позже.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDebtType = (type: string) => {
    setQuizForm(prev => ({
      ...prev,
      debt_types: prev.debt_types.includes(type)
        ? prev.debt_types.filter(t => t !== type)
        : [...prev.debt_types, type]
    }));
  };

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
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
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

      <section id="quiz" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Подберем решение для вашей ситуации
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Ответьте на несколько вопросов и получите бесплатную консультацию
          </p>
          
          <Card className="border-2">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Шаг {quizStep} из 4</span>
                  <span className="text-sm font-semibold text-primary">{Math.round((quizStep / 4) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{width: `${(quizStep / 4) * 100}%`}}></div>
                </div>
              </div>

              {quizStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <label className="text-2xl font-bold text-foreground block text-center">Сумма вашего долга</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { value: 'less300k', label: 'Менее 300 тыс. рублей' },
                      { value: '300k-1m', label: 'От 300 тыс. до 1 млн рублей' },
                      { value: '1m-5m', label: 'От 1 млн до 5 млн рублей' },
                      { value: 'more5m', label: 'Более 5 млн рублей' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant="outline"
                        className="h-auto py-6 px-6 text-lg hover:bg-primary hover:text-primary-foreground transition-all"
                        onClick={() => {
                          setQuizForm({...quizForm, debt_amount: option.value});
                          setQuizStep(2);
                        }}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <label className="text-2xl font-bold text-foreground block text-center">Беспокоят ли Вас коллекторы?</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'yes', label: 'Да' },
                      { value: 'no', label: 'Нет' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant="outline"
                        className="h-auto py-8 px-6 text-xl hover:bg-primary hover:text-primary-foreground transition-all"
                        onClick={() => {
                          setQuizForm({...quizForm, collectors: option.value});
                          setQuizStep(3);
                        }}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setQuizStep(1)}
                    className="w-full"
                  >
                    ← Назад
                  </Button>
                </div>
              )}

              {quizStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <label className="text-2xl font-bold text-foreground block text-center">Какие у вас задолженности?</label>
                  <p className="text-center text-muted-foreground">Можно выбрать несколько</p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { value: 'credits', label: 'Кредиты или кредитные карты' },
                      { value: 'mortgage', label: 'Ипотека или автокредиты' },
                      { value: 'taxes', label: 'Налоги или задолженности по ЖКХ' },
                      { value: 'other', label: 'Другое' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={quizForm.debt_types.includes(option.value) ? 'default' : 'outline'}
                        className={`h-auto py-5 px-6 text-lg text-left justify-start ${quizForm.debt_types.includes(option.value) ? 'bg-primary text-primary-foreground' : ''}`}
                        onClick={() => toggleDebtType(option.value)}
                      >
                        <Icon name={quizForm.debt_types.includes(option.value) ? 'CheckSquare' : 'Square'} size={24} className="mr-3" />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="ghost" 
                      onClick={() => setQuizStep(2)}
                      className="flex-1"
                    >
                      ← Назад
                    </Button>
                    <Button 
                      onClick={() => setQuizStep(4)}
                      disabled={quizForm.debt_types.length === 0}
                      className="flex-1 bg-primary text-primary-foreground"
                    >
                      Далее →
                    </Button>
                  </div>
                </div>
              )}

              {quizStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="text-center space-y-2 mb-6">
                    <h3 className="text-2xl font-bold text-foreground">Последний шаг!</h3>
                    <p className="text-muted-foreground">Укажите контакты для получения консультации</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">Ваше имя</label>
                      <Input 
                        placeholder="Иван Иванов" 
                        className="border-2 h-12" 
                        value={quizForm.name}
                        onChange={(e) => setQuizForm({...quizForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">Телефон</label>
                      <Input 
                        placeholder="+7 (___) ___-__-__" 
                        className="border-2 h-12" 
                        value={quizForm.phone}
                        onChange={(e) => setQuizForm({...quizForm, phone: e.target.value})}
                        maxLength={18}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="ghost" 
                      onClick={() => setQuizStep(3)}
                      className="flex-1"
                    >
                      ← Назад
                    </Button>
                    <Button 
                      onClick={handleQuizSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg py-6"
                    >
                      {isSubmitting ? 'Отправка...' : 'Получить консультацию'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
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
            {[
              "https://vkvideo.ru/video-78655613_456239123?t=59s",
              "https://vkvideo.ru/video-78655613_456239032?t=3m3s",
              "https://vkvideo.ru/video-78655613_456239047?t=1m26s",
              "https://vkvideo.ru/video-78655613_456239043?t=4m25s",
              "https://vkvideo.ru/video-78655613_456239073?t=1m29s",
              "https://vkvideo.ru/video-78655613_456239040"
            ].map((url, index) => {
              const videoId = url.match(/video(-?\d+_\d+)/)?.[1] || '';
              const embedUrl = `https://vk.com/video_ext.php?oid=${videoId.split('_')[0]}&id=${videoId.split('_')[1]}&hd=2`;
              
              return (
                <Card key={index} className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
                  <div className="aspect-video">
                    <iframe
                      src={embedUrl}
                      width="100%"
                      height="100%"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                      frameBorder="0"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      Отзыв клиента о банкротстве
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-foreground">
              Отзывы с Яндекс.Карт
            </h3>
            <div className="flex justify-center">
              <div className="w-full max-w-2xl overflow-hidden rounded-lg border-2 border-gray-200 shadow-xl">
                <iframe 
                  style={{width: '100%', height: '600px', border: 'none'}}
                  src="https://yandex.ru/maps-reviews-widget/115872286637?comments"
                  title="Отзывы ВИТАКОН"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Получите бесплатную консультацию
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Оставьте заявку и мы свяжемся с вами в течение 15 минут
          </p>
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-3">
              <Card className="border-2 shadow-xl">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Ваше имя</label>
                    <Input 
                      placeholder="Иван Иванов" 
                      className="border-2" 
                      value={consultationForm.name}
                      onChange={(e) => setConsultationForm({...consultationForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Телефон</label>
                    <Input 
                      placeholder="+7 (___) ___-__-__" 
                      className="border-2" 
                      value={consultationForm.phone}
                      onChange={(e) => setConsultationForm({...consultationForm, phone: e.target.value})}
                      maxLength={18}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Сумма задолженности</label>
                    <Input 
                      placeholder="Например, 500 000 ₽" 
                      className="border-2" 
                      value={consultationForm.debt_amount}
                      onChange={(e) => setConsultationForm({...consultationForm, debt_amount: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Комментарий</label>
                    <Textarea 
                      placeholder="Опишите вашу ситуацию" 
                      rows={4} 
                      className="border-2" 
                      value={consultationForm.comment}
                      onChange={(e) => setConsultationForm({...consultationForm, comment: e.target.value})}
                    />
                  </div>
                  <Button 
                    onClick={handleConsultationSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg py-6"
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-1">Телефон</p>
                      <a href="tel:88006001974" className="text-primary hover:text-primary/80 font-bold text-xl">
                        8 (800) 600-19-74
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Звонок по России бесплатный</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-secondary/5 to-primary/5">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-1">Наши офисы</p>
                      <p className="text-foreground font-semibold">37 офисов по всей России</p>
                      <p className="text-sm text-muted-foreground mt-2">Выберем удобный для встречи</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-1">Время работы</p>
                      <p className="text-foreground">Пн-Пт: 9:00 - 18:00</p>
                      <p className="text-sm text-muted-foreground mt-1">Заявки принимаем круглосуточно</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-secondary">ВИТАКОН</h3>
              <p className="text-white/80 mb-4">
                Юридическая компания по банкротству физических лиц. Работаем с 2015 года.
              </p>
              <div className="text-white/70 text-sm space-y-1">
                <p className="font-semibold">ООО "ВИТАКОН"</p>
                <p>г. Курган, ул. Пичугина, стр. 9, пом. 1, офис 221</p>
                <p>ИНН 7451388149</p>
                <p>ОГРН 1157451003973</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-white/80">
                <a href="tel:88006001974" className="block hover:text-secondary transition-colors font-semibold">
                  8 (800) 600-19-74
                </a>
                <p>37 офисов по всей России</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Информация</h4>
              <div className="space-y-2 text-white/80">
                <p>Работаем согласно ФЗ №127-ФЗ</p>
                <a href="/privacy" className="block hover:text-secondary transition-colors">Политика конфиденциальности</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>© 2026 ВИТАКОН. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
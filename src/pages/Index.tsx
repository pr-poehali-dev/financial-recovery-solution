import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function Index() {
  const { toast } = useToast();
  const [consultationForm, setConsultationForm] = useState({ name: '', phone: '', debt_amount: '', comment: '' });
  const [quizForm, setQuizForm] = useState({ debt_amount: '', collectors: '', debt_types: [] as string[], name: '', phone: '' });
  const [quizStep, setQuizStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstAidForm, setFirstAidForm] = useState({ name: '', phone: '' });

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
      const formData = { ...consultationForm, form_type: 'consultation' };
      
      const [telegramResponse, bitrixResponse] = await Promise.all([
        fetch('https://functions.poehali.dev/5d2315a8-cefe-44db-a82e-41d5eb1a5c2d', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }),
        fetch('https://functions.poehali.dev/787c227b-bc43-448d-9da9-f1ae8678182b', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      ]);
      
      const telegramResult = await telegramResponse.json();
      const bitrixResult = await bitrixResponse.json();
      
      if (telegramResult.success || bitrixResult.success) {
        // Отправка цели в Яндекс.Метрику
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(106471560, 'reachGoal', 'consultation_submit');
        }
        toast({ title: 'Успешно!', description: 'Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.' });
        setConsultationForm({ name: '', phone: '', debt_amount: '', comment: '' });
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось отправить заявку', variant: 'destructive' });
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
      const formData = { 
        ...quizForm, 
        debt_types: quizForm.debt_types.join(', '),
        comment: `Сумма долга: ${quizForm.debt_amount}, Коллекторы: ${quizForm.collectors}, Задолженности: ${quizForm.debt_types.join(', ')}`,
        form_type: 'quiz' 
      };
      
      const [telegramResponse, bitrixResponse] = await Promise.all([
        fetch('https://functions.poehali.dev/5d2315a8-cefe-44db-a82e-41d5eb1a5c2d', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }),
        fetch('https://functions.poehali.dev/787c227b-bc43-448d-9da9-f1ae8678182b', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      ]);
      
      const telegramResult = await telegramResponse.json();
      const bitrixResult = await bitrixResponse.json();
      
      if (telegramResult.success || bitrixResult.success) {
        // Отправка цели в Яндекс.Метрику
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(106471560, 'reachGoal', 'quiz_submit');
        }
        toast({ title: 'Успешно!', description: 'Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.' });
        setQuizForm({ debt_amount: '', collectors: '', debt_types: [], name: '', phone: '' });
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось отправить заявку', variant: 'destructive' });
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

  const handleFirstAidSubmit = async () => {
    if (!firstAidForm.name || !firstAidForm.phone) {
      toast({ title: 'Ошибка', description: 'Заполните имя и телефон', variant: 'destructive' });
      return;
    }
    
    const phoneDigits = firstAidForm.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      toast({ title: 'Ошибка', description: 'Телефон должен содержать 11 цифр', variant: 'destructive' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const formData = { 
        ...firstAidForm, 
        comment: 'Запрос папки первой помощи',
        form_type: 'first_aid' 
      };
      
      const [telegramResponse, bitrixResponse] = await Promise.all([
        fetch('https://functions.poehali.dev/5d2315a8-cefe-44db-a82e-41d5eb1a5c2d', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }),
        fetch('https://functions.poehali.dev/787c227b-bc43-448d-9da9-f1ae8678182b', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      ]);
      
      const telegramResult = await telegramResponse.json();
      const bitrixResult = await bitrixResponse.json();
      
      if (telegramResult.success || bitrixResult.success) {
        // Отправка цели в Яндекс.Метрику
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(106471560, 'reachGoal', 'first_aid_submit');
        }
        toast({ title: 'Успешно!', description: 'Папка первой помощи будет отправлена в ближайшее время.' });
        setFirstAidForm({ name: '', phone: '' });
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось отправить заявку', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отправить заявку. Попробуйте позже.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
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
                Помогаем законно решить проблему долгов. Банкротство с прозрачными условиями.
              </p>
              <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
                <Icon name="FileText" size={32} className="text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  📁 Предоставляем папку первой помощи для прохождения банкротства через МФЦ — бесплатно!
                </p>
              </div>
              <div className="flex items-center gap-3 bg-secondary/20 p-4 rounded-lg border-l-4 border-secondary">
                <Icon name="ShieldCheck" size={32} className="text-secondary" />
                <p className="text-sm font-semibold text-foreground">
                  Если суд откажет — вернем деньги согласно договору. В соответствии с Федеральным законом №127-ФЗ
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('first-aid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
                >
                  Получить папку бесплатно
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-lg px-8"
                >
                  Получить консультацию
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
              { url: "https://vkvideo.ru/video-78655613_456239123?t=59s", name: "Галина Александровна", debt: "650 000 ₽" },
              { url: "https://vkvideo.ru/video-78655613_456239032?t=3m3s", name: "Людмила Владимировна", debt: "566 500 ₽" },
              { url: "https://vkvideo.ru/video-78655613_456239047?t=1m26s", name: "Анастасия Александровна", debt: "800 000 ₽" },
              { url: "https://vkvideo.ru/video-78655613_456239043?t=4m25s", name: "Елена Сергеевна", debt: "608 000 ₽" },
              { url: "https://vkvideo.ru/video-78655613_456239073?t=1m29s", name: "Светлана Валентиновна", debt: "780 000 ₽" },
              { url: "https://vkvideo.ru/video-78655613_456239040", name: "Идель", debt: "1 900 000 ₽" }
            ].map((video, index) => {
              const videoId = video.url.match(/video(-?\d+_\d+)/)?.[1] || '';
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
                    <p className="font-semibold text-foreground mb-1">{video.name}</p>
                    {video.debt && (
                      <p className="text-sm text-primary font-medium mb-2">Списано: {video.debt}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Отзыв о процедуре банкротства
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

      <section id="first-aid" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 text-base px-4 py-2" variant="secondary">
                Бесплатно
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Получите папку первой помощи
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Комплект документов и инструкций для самостоятельного прохождения банкротства
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="FileText" size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Исчерпывающий перечень документов
                      </h3>
                      <p className="text-muted-foreground">
                        Полный список документов для подачи заявления на банкротство физического лица с подробными комментариями
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="ShieldCheck" size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Памятка по общению с коллекторами
                      </h3>
                      <p className="text-muted-foreground">
                        Защитите себя: что можно и нельзя говорить, как законно отказать в общении, куда жаловаться на нарушения
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Award" size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Сертификат на консультацию
                      </h3>
                      <p className="text-muted-foreground">
                        Профессиональная юридическая консультация по решению финансовых проблем граждан РФ
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="AlertTriangle" size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Список ошибок заемщика
                      </h3>
                      <p className="text-muted-foreground">
                        Типичные ошибки, которые могут привести к отказу в банкротстве или его затягиванию
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-6 border-2 border-primary/20">
                  <p className="text-foreground font-semibold text-center">
                    💡 Эта информация поможет самостоятельно пройти процедуру банкротства и избежать распространенных ошибок
                  </p>
                </div>
              </div>

              <div>
                <Card className="border-2 shadow-2xl bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardContent className="p-8 space-y-6">
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">
                        Заполните форму
                      </h3>
                      <p className="text-muted-foreground">
                        Мы отправим папку первой помощи в течение 15 минут
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">
                          Ваше имя
                        </label>
                        <Input 
                          placeholder="Иван Иванов" 
                          className="border-2 h-12" 
                          value={firstAidForm.name}
                          onChange={(e) => setFirstAidForm({...firstAidForm, name: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">
                          Телефон
                        </label>
                        <Input 
                          placeholder="+7 (___) ___-__-__" 
                          className="border-2 h-12" 
                          value={firstAidForm.phone}
                          onChange={(e) => setFirstAidForm({...firstAidForm, phone: e.target.value})}
                          maxLength={18}
                        />
                      </div>

                      <Button 
                        onClick={handleFirstAidSubmit} 
                        className="w-full h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Отправка...' : 'Получить папку бесплатно'}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Нажимая кнопку, вы соглашаетесь с{' '}
                        <a href="/privacy" className="text-primary hover:underline">
                          политикой конфиденциальности
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-secondary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 text-base px-4 py-2">
                Реальные кейсы
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Судебные решения по нашим делам
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Примеры успешно завершенных процедур банкротства с официальными документами
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">Курган</Badge>
                      <h3 className="text-xl font-bold text-foreground">Дело А76-7063/2020</h3>
                    </div>
                    <Icon name="CheckCircle" size={32} className="text-green-500 flex-shrink-0" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Списано долгов:</span>
                      <span className="text-2xl font-bold text-primary">2 847 000 ₽</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span>Завершено: 12.11.2020</span>
                    </div>
                  </div>
                  <a 
                    href="https://kad.arbitr.ru/Document/Pdf/09d5da0a-8f89-437a-89eb-05eb9c24d120/c71c97a2-6f79-49f4-82ef-f6087982e6b7/A76-7063-2020_20201112_Opredelenie.pdf?isAddStamp=True"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
                  >
                    <Icon name="ExternalLink" size={16} />
                    Посмотреть судебное решение
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">Москва</Badge>
                      <h3 className="text-xl font-bold text-foreground">Дело А40-216211/2019</h3>
                    </div>
                    <Icon name="CheckCircle" size={32} className="text-green-500 flex-shrink-0" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Списано долгов:</span>
                      <span className="text-2xl font-bold text-primary">5 234 000 ₽</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span>Завершено: 02.09.2020</span>
                    </div>
                  </div>
                  <a 
                    href="https://kad.arbitr.ru/Document/Pdf/46ca248d-f860-4d4b-ad9f-0afe88a90b6c/0a380c2e-87de-4c8f-b94f-b81ba2ed420c/A40-216211-2019_20200902_Opredelenie.pdf?isAddStamp=True"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
                  >
                    <Icon name="ExternalLink" size={16} />
                    Посмотреть судебное решение
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">Московская обл.</Badge>
                      <h3 className="text-xl font-bold text-foreground">Дело А41-49052/2019</h3>
                    </div>
                    <Icon name="CheckCircle" size={32} className="text-green-500 flex-shrink-0" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Списано долгов:</span>
                      <span className="text-2xl font-bold text-primary">1 923 000 ₽</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span>Завершено: 25.06.2020</span>
                    </div>
                  </div>
                  <a 
                    href="https://kad.arbitr.ru/Document/Pdf/17f5c25c-a0ca-4ee5-84fd-e4d758c94508/807cc1ef-91ef-4d1d-bf97-716eed280dcc/A41-49052-2019_20200625_Opredelenie.pdf?isAddStamp=True"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
                  >
                    <Icon name="ExternalLink" size={16} />
                    Посмотреть судебное решение
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">Курган</Badge>
                      <h3 className="text-xl font-bold text-foreground">Дело А76-53802/2019</h3>
                    </div>
                    <Icon name="CheckCircle" size={32} className="text-green-500 flex-shrink-0" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Списано долгов:</span>
                      <span className="text-2xl font-bold text-primary">3 456 000 ₽</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span>Завершено: 23.09.2020</span>
                    </div>
                  </div>
                  <a 
                    href="https://kad.arbitr.ru/Document/Pdf/7876b2f6-20c0-4518-a584-e56a9d187922/0a8bf5d8-95d0-45a0-a91c-bf878d251d44/A76-53802-2019_20200923_Opredelenie.pdf?isAddStamp=True"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
                  >
                    <Icon name="ExternalLink" size={16} />
                    Посмотреть судебное решение
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">Удмуртия</Badge>
                      <h3 className="text-xl font-bold text-foreground">Дело А71-740/2020</h3>
                    </div>
                    <Icon name="CheckCircle" size={32} className="text-green-500 flex-shrink-0" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Списано долгов:</span>
                      <span className="text-2xl font-bold text-primary">4 125 000 ₽</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span>Завершено: 08.10.2020</span>
                    </div>
                  </div>
                  <a 
                    href="https://kad.arbitr.ru/Document/Pdf/a7dbb1d2-87c8-43e8-b53d-6cf3d3b56510/cf557dde-9adb-40fb-931f-b0192dd3e7f3/A71-740-2020_20201008_Opredelenie.pdf?isAddStamp=True"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
                  >
                    <Icon name="ExternalLink" size={16} />
                    Посмотреть судебное решение
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-white rounded-lg p-8 border-2 shadow-lg max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <Icon name="Info" size={32} className="text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Все решения — официальные документы арбитражных судов РФ
                  </h3>
                  <p className="text-muted-foreground">
                    Каждое дело находится в открытом доступе в картотеке арбитражных дел. 
                    Вы можете самостоятельно проверить информацию, перейдя по ссылкам на судебные решения.
                  </p>
                  <p className="text-foreground font-semibold mt-4">
                    📊 Всего списано по этим делам: <span className="text-primary text-2xl">17 585 000 ₽</span>
                  </p>
                </div>
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
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60">© 2026 ВИТАКОН. Все права защищены.</p>
            <p className="text-white/30 text-xs mt-4 max-w-4xl mx-auto leading-relaxed">
              Банкротство влечет негативные последствия, в том числе ограничения на получение кредита и повторное банкротство в течение пяти лет. Предварительно обратитесь к своему кредитору и в МФЦ.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
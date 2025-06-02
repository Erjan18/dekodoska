import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-16">
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">О компании</h1>
          <div className="flex items-center text-gray-300">
            <Link to="/" className="hover:text-white">Главная</Link>
            <ChevronRight size={16} className="mx-2" />
            <span>О компании</span>
          </div>
        </div>
      </div>
      
      {/* Company history */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-600 font-semibold mb-2 block">Наша история</span>
              <h2 className="text-3xl font-bold mb-6">Более 12 лет производим качественную террасную доску</h2>
              
              <p className="text-gray-600 mb-4">
                Компания ДекоДоска начала свою деятельность в 2010 году как небольшое производство террасной доски из древесно-полимерного композита. Основателями компании стали инженеры с опытом работы в деревообрабатывающей промышленности.
              </p>
              
              <p className="text-gray-600 mb-4">
                Начав с одной производственной линии, сегодня мы располагаем современным заводом с автоматизированным оборудованием, что позволяет нам производить до 500 000 м² террасной доски в год.
              </p>
              
              <p className="text-gray-600 mb-4">
                Наша миссия — обеспечивать клиентов высококачественными материалами для благоустройства открытых пространств, сочетая инновации, экологичность и долговечность.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -right-6 bottom-6 left-6 bg-amber-100 rounded-lg"></div>
              <img 
                src="https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg" 
                alt="Производство террасной доски" 
                className="relative z-10 rounded-lg shadow-xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Production process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold mb-2 block">Как мы работаем</span>
            <h2 className="text-3xl font-bold">Процесс производства</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Подготовка сырья</h3>
              <p className="text-gray-600">
                Мы тщательно отбираем компоненты для нашей доски — древесную муку высокого качества и современные полимеры, которые обеспечивают долговечность и стойкость к воздействию окружающей среды.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Экструзия</h3>
              <p className="text-gray-600">
                На этапе экструзии смесь из древесной муки и полимеров нагревается и под давлением формируется в доски необходимого профиля. Этот процесс контролируется компьютером для обеспечения стабильного качества.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Контроль качества</h3>
              <p className="text-gray-600">
                Каждая партия проходит строгий контроль качества. Мы проверяем геометрические размеры, прочность, устойчивость к воздействию ультрафиолета и влаги, чтобы гарантировать долговечность нашей продукции.
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.pexels.com/photos/280106/pexels-photo-280106.jpeg" 
                alt="Процесс производства" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <p className="text-gray-600">
                На нашем производстве установлено современное оборудование ведущих европейских производителей, которое позволяет нам выпускать до 1500 м² террасной доски в день. Мы постоянно совершенствуем технологию производства, внедряя инновации для улучшения потребительских свойств нашей продукции.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Advantages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold mb-2 block">Почему нас выбирают</span>
            <h2 className="text-3xl font-bold">Преимущества компании</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <CheckCircle className="text-amber-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Собственное производство</h3>
                <p className="text-gray-600">
                  Мы контролируем весь процесс от закупки сырья до отгрузки готовой продукции, что позволяет нам гарантировать высокое качество и оптимальные цены без посредников.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <CheckCircle className="text-amber-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Гарантия до 25 лет</h3>
                <p className="text-gray-600">
                  Мы уверены в качестве нашей продукции и предоставляем длительную гарантию на все виды террасной доски. Наши изделия не гниют, не трескаются и не выцветают на солнце.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <CheckCircle className="text-amber-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Экологичность</h3>
                <p className="text-gray-600">
                  Наша продукция изготавливается из экологически чистых материалов и не содержит вредных для здоровья веществ. Мы заботимся о природе, используя в производстве переработанные материалы.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <CheckCircle className="text-amber-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Техническая поддержка</h3>
                <p className="text-gray-600">
                  Наши специалисты всегда готовы проконсультировать вас по вопросам выбора, монтажа и эксплуатации террасной доски. Мы предоставляем подробные инструкции и видеоматериалы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Certificates */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold mb-2 block">Гарантия качества</span>
            <h2 className="text-3xl font-bold">Сертификаты и награды</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                <Award size={48} className="text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Сертификат соответствия ГОСТ</h3>
              <p className="text-sm text-gray-600">
                Подтверждает соответствие нашей продукции российским государственным стандартам качества и безопасности.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                <Award size={48} className="text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Экологический сертификат</h3>
              <p className="text-sm text-gray-600">
                Свидетельствует об экологической безопасности наших изделий и соответствии международным экологическим стандартам.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                <Award size={48} className="text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Лауреат премии "Лучший производитель"</h3>
              <p className="text-sm text-gray-600">
                Награда от отраслевой ассоциации производителей строительных материалов за высокое качество продукции.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы сотрудничать с нами?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ознакомьтесь с нашим ассортиментом террасной доски и выберите идеальное решение для вашего проекта
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100"
            >
              <Link to="/catalog" className="block w-full">
                Перейти в каталог
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/contact" className="block w-full">
                Связаться с нами
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
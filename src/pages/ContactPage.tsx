import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, укажите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, укажите корректный email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Пожалуйста, введите сообщение';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission (in a real app, this would be an API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Reset success message after a delay
      setTimeout(() => {
        setIsSubmitSuccess(false);
      }, 5000);
    }, 1000);
  };
  
  return (
    <div className="pt-16">
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Контакты</h1>
          <div className="flex items-center text-gray-300">
            <Link to="/" className="hover:text-white">Главная</Link>
            <ChevronRight size={16} className="mx-2" />
            <span>Контакты</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Связаться с нами</h2>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <MapPin className="text-amber-600" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Адрес</h3>
                  <p className="text-gray-600">г. Бишкек, ул. Анкара 70</p>
                  <p className="text-gray-600">Москва, 123456, Россия</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <Phone className="text-amber-600" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Телефоны</h3>
                  <p className="text-gray-600">Отдел продаж: +996 550 200 300</p>
                  <p className="text-gray-600">Техническая поддержка: +7 (999) 765-43-21</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <Mail className="text-amber-600" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">Общие вопросы: info@dekodoska.kg</p>
                  <p className="text-gray-600">Отдел продаж: sales@dekodoska.ru</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="text-amber-600" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Режим работы</h3>
                  <p className="text-gray-600">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-gray-600">Сб: 10:00 - 15:00</p>
                  <p className="text-gray-600">Вс: выходной</p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="mt-8 h-80 bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5887690331656!2d37.617564076942886!3d55.75639997987272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2sKremlin!5e0!3m2!1sen!2sru!4v1697794331599!5m2!1sen!2sru" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта расположения компании"
              ></iframe>
            </div>
          </div>
          
          {/* Contact form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
              
              {isSubmitSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                  <p className="font-medium">Спасибо за ваше сообщение!</p>
                  <p>Мы свяжемся с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <Input
                      label="Ваше имя *"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      fullWidth
                    />
                    
                    <Input
                      label="Email *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      fullWidth
                    />
                    
                    <Input
                      label="Телефон"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      helperText="Необязательно"
                      fullWidth
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Сообщение *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className={`
                          w-full rounded-md shadow-sm 
                          ${errors.message 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'}
                        `}
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      isLoading={isSubmitting}
                      leftIcon={!isSubmitting ? <Send size={18} /> : undefined}
                    >
                      Отправить сообщение
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   // Simulate form submission
  //   await new Promise(resolve => setTimeout(resolve, 2000));
  //   setIsSubmitting(false);
  //   alert('Message sent successfully!');
  //   setFormData({ firstName: '', lastName: '', email: '', message: '' });
  // };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Our friendly team is here to help.',
      contact: 'bookory@mail.com',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Office',
      description: 'Come say hello at our HQ.',
      contact: 'Dhaka, Bangladesh',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      description: 'Mon-Fri from 8am to 5pm.',
      contact: '+1 (555) 123-4567',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      description: 'We\'re here when you need us.',
      contact: 'Mon-Fri: 9AM-6PM',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
      iconColor: 'text-amber-600',
      textColor: 'text-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container px-6 py-16 mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-rose-100 dark:bg-rose-900/30 rounded-full mb-6">
              <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                📞 Contact us
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-rose-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-rose-400 dark:to-purple-400 mb-6">
              Let's Start a Conversation
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8">
                Get in Touch
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`${info.bgColor} dark:bg-gray-800/50 p-6 rounded-2xl border border-white/20 dark:border-gray-700/50 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-xl group cursor-pointer`}
                  >
                    <div className={`inline-flex p-3 rounded-xl ${info.iconColor} bg-white/80 dark:bg-gray-700/50 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-6 h-6" />
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                      {info.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {info.description}
                    </p>
                    <p className={`mt-2 text-sm font-medium ${info.textColor} dark:opacity-90`}>
                      {info.contact}
                    </p>
                  </div>
                ))}
              </div>

              {/* Additional CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl text-white">
                <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
                <p className="text-rose-100 mb-4">Join thousands of satisfied customers who trust us.</p>
                <button className="bg-white text-rose-600 px-6 py-2 rounded-lg font-medium hover:bg-rose-50 transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>

            {/* Enhanced Form */}
            <div className="relative">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Send us a message
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Fill out the form below and we'll get back to you
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent dark:text-white transition-all duration-200 group-hover:border-rose-300"
                        placeholder="John"
                      />
                    </div>

                    <div className="group">
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent dark:text-white transition-all duration-200 group-hover:border-rose-300"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent dark:text-white transition-all duration-200 group-hover:border-rose-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="group">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent dark:text-white transition-all duration-200 group-hover:border-rose-300 resize-none"
                      placeholder="Tell us about your project or ask us a question..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>We typically respond within 2-4 hours during business hours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
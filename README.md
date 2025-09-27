# Prashikshan - Academia-Industry Internship Platform

A modern, responsive web application prototype for connecting students, educational institutions, and industry partners through meaningful internship experiences. Built with React, Tailwind CSS, and designed for the New Education Policy (NEP) 2020 compliance.

## 🌟 Features

### For Students
- **Verified Internships**: Browse and apply for KYC-verified internship opportunities
- **Digital Logbooks**: Maintain daily work logs with geo-tagging and automatic report generation
- **Skill Development**: Access pre-internship skill modules and earn industry-relevant badges
- **Rural Support**: Offline-capable mobile interface designed for low-bandwidth areas

### For Faculty/Institutions
- **Dashboard Management**: Review and approve student internship progress
- **Credit Mapping**: Map internship work to academic credits per NEP 2020 guidelines
- **Student Monitoring**: Track student progress with detailed analytics
- **Report Generation**: Automated NEP-compliant internship reports

### For Industry Partners
- **Talent Pool Access**: Connect with verified students from educational institutions
- **Streamlined Process**: Simplified internship posting and candidate evaluation
- **Rural Reach**: Access to students from tier-2 and tier-3 cities
- **CSR Integration**: Contribute to skill development and community growth

## 🚀 Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion for smooth interactions
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Persistence**: LocalStorage (for prototype)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prashikshan-prototype
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎮 Demo Features

### Login System
The prototype includes a mock authentication system with three user types:
- **Student Login**: Access to internship browsing and application features
- **Faculty Login**: Access to approval dashboard and student monitoring
- **Industry Login**: Access to internship posting and candidate management

### Sample Data
The application comes with pre-loaded sample data including:
- Mock internship listings from verified companies
- Sample student logbook entries
- Demo faculty approval workflow

### Interactive Elements
- **Smooth scrolling** navigation between sections
- **Animated interactions** with hover effects and transitions
- **Responsive design** that works on desktop, tablet, and mobile
- **Modal dialogs** for login and detailed views
- **Form validation** with real-time feedback

## 🗂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar with login buttons
│   ├── Hero.jsx        # Landing page hero section
│   ├── RoleCards.jsx   # Role selection cards
│   ├── Features.jsx    # Features showcase grid
│   ├── HowItWorks.jsx  # Process flow visualization
│   ├── IndustryBenefits.jsx # Benefits and testimonials
│   ├── Footer.jsx      # Site footer
│   └── LoginModal.jsx  # Authentication modal
├── pages/              # Page components
│   ├── HomePage.jsx    # Main landing page
│   ├── InternshipGuide.jsx # Comprehensive guide
│   └── FacultyDemo.jsx # Faculty dashboard demo
├── contexts/           # React Context providers
│   └── AuthContext.jsx # Authentication state management
├── utils/              # Utility functions
│   └── helpers.js      # LocalStorage, validation, etc.
├── data/               # Mock data and constants
│   └── mockData.js     # Sample internships, users, etc.
└── styles/
    └── index.css       # Global styles and Tailwind imports
```

## 🎯 Key Sections

### Home Page
- **Hero Section**: Compelling introduction with call-to-action
- **Role Cards**: Interactive cards for different user types
- **Features Grid**: Six key platform features with icons and descriptions
- **How It Works**: Three-step process visualization
- **Industry Benefits**: Why companies should join with testimonials
- **Partnership Callout**: Information for colleges and government

### Internship Guide
- Comprehensive step-by-step guide for students
- FAQ section addressing common concerns
- NEP 2020 compliance information
- Rural accessibility features

### Faculty Dashboard
- Student logbook entry review and approval
- Statistics and filtering options
- Detailed entry viewing with approval/rejection actions
- Demo data for testing the workflow

## 🔧 Customization

### Branding
- Update the logo and colors in `tailwind.config.js`
- Modify the primary color scheme (currently teal/primary)
- Replace placeholder text with actual content

### Data Integration
- Replace mock data in `src/data/mockData.js` with API calls
- Update authentication logic in `AuthContext.jsx`
- Implement real backend integration for data persistence

### Features
- Add more user roles or permissions
- Implement real-time notifications
- Add file upload capabilities for logbook entries
- Integrate with actual mapping services for geo-tagging

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## ♿ Accessibility Features

- Proper ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance (WCAG 2.1 AA)
- Screen reader compatibility
- Focus management in modals

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://yourusername.github.io/prashikshan-prototype"`
3. Deploy: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created as a prototype for educational purposes. Please check with the original requirements before using in production.

## 📞 Support

For questions or support regarding this prototype, please contact:
- Email: team@prashikshan.example
- GitHub Issues: [Create an issue](https://github.com/yourusername/prashikshan-prototype/issues)

## 🙏 Acknowledgments

- **NEP 2020**: Built to align with New Education Policy guidelines
- **Design Inspiration**: Modern SaaS and EdTech platforms
- **Icons**: Lucide React icon library
- **UI Components**: Built with Tailwind CSS and Headless UI patterns

---

**Note**: This is a prototype application built for demonstration purposes. For production use, implement proper backend services, security measures, and data validation.
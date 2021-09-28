const footerColumns = [
    {
        title: 'For Students',
        rows: [
            { title: 'Services', url: '/student-services' },
            { title: 'Premium Plan', url: '/premium-plan' },
            { title: 'Student Blog', url: '/student-blog' },
            { title: 'Franchise Expression Form', url: '/franchise-expression-form' },
        ]
    },{
        title: 'For Institutions',
        rows: [
            { title: 'Services', url: '/institution-services' },
            { title: 'Business Plan', url: '/institution-business-plan' },
            { title: 'Industry Blog', url: '/industry-blog' },
            { title: 'Request a demo', url: '/institution-request-demo' },
        ]
    }, {
        title: 'Others',
        rows: [
            { title: 'About Us', url: '/about-us' },
            { title: 'Virtual Events', url: '/virtual-events' },
            { title: 'FAQ', url: '/faq' },
            { title: 'Contact Us', url: '/contact-us' },
        ]
    }, {
        title: '',
        rows: [
            { title: 'Privacy Policy', url: '/privacy-policy' },
            { title: 'Our App', url: '/our-app' },
            { title: 'Sitemap', url: '/sitemap' },
        ]
    }
]

const mainHeaderColumns = [
    { title: 'Home', rows: [], url: '/' },
    { title: 'About Us', rows: [], url: '/entity/student' },
    { title: 'For Students', rows: [
        { title: 'What we do', url: '/what-we-do' },
        { title: 'Premium Plan', url: '/premium-plan' },
        { title: 'Blog', url: '/student-blog' },
        { title: 'Ambassador', url: '/ambassador' },
    ]}, {
        title: 'For Institutions',
        rows: [
            { title: 'Why findadmission', url: '/why-findadmission' },
            { title: 'How it works', url: '/how-it-works' },
            { title: 'Plans & Pricing', url: '/plans-pricing' },
            { title: 'Blog', url: '/institution-blog' },
            { title: 'Request a demo', url: '/institution-request-demo' },
        ]
    }, {
        title: 'Events', rows: [], url: '/events',
    }, {
        title: 'Resources', rows: [
            { title: 'For Students', 
                rows: [
                    { title: 'FAQ', url: '/faq' },
                    { title: 'Advertising', url: '/advertising' },
                ],
                url: "",
            },{
                title: 'For Institutions',
                rows: [
                    { title: 'Our App', url: '/our-app' },
                    { title: 'Videos', url: '/videos' },
                    { title: 'Webinars', url: '/webinars' },
                    { title: 'FAQs', url: '/faqs' },
                ],
                url: ""
            }
        ]
    }, {
        title: 'Contact Us', rows: [], url: '/contact-us'
    }
]
export {
    footerColumns,
    mainHeaderColumns
}
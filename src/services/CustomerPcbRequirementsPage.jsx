import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Send, 
  Download, 
  CheckCircle2, 
  Cpu, 
  Wrench, 
  Eye, 
  ShieldCheck, 
  Activity, 
  Settings, 
  Layers, 
  Box, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Sparkles,
  ArrowLeft,
  AlertCircle,
  Clock,
  HelpCircle,
  Check,
  MessageSquare
} from 'lucide-react';
import jsPDF from 'jspdf';

export default function CustomerPcbRequirementsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectTitle: '',
    servicesRequested: {
      pcbAssembly: true,
      resolderingRework: false,
      microSoldering: false,
      physicalInspection: true,
      qualityCheck: true,
      functionalTesting: false,
      maintenanceRepair: false,
      componentSourcing: false
    },
    boardCondition: 'Bare PCB',
    quantity: '10',
    layerCount: '2 Layers',
    boardDimensions: '',
    mountingType: 'Mixed (SMT + Through-Hole)',
    smtComponentCount: '',
    pthComponentCount: '',
    turnaroundTime: 'Standard (3-5 Business Days)',
    specialInstructions: '',
    hasComponentBom: 'Yes',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedPdfBlobUrl, setGeneratedPdfBlobUrl] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const els = document.querySelectorAll('.reveal-up');
    if (els.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });

      els.forEach(el => observer.observe(el));
    }
  }, []);

  const availableServices = [
    { key: 'pcbAssembly', label: 'PCB Assembly (SMT / PTH)', icon: Cpu, desc: 'Mounting components on customer-supplied bare boards' },
    { key: 'resolderingRework', label: 'Re-Soldering & Joint Rework', icon: Wrench, desc: 'Joint reflow correction, SMD replacement & micro rework' },
    { key: 'microSoldering', label: 'Fine-Pitch Micro-Soldering', icon: Sparkles, desc: 'BGA reballing, fine pin soldering & trace restoration' },
    { key: 'physicalInspection', label: 'Physical Microscopic Inspection', icon: Eye, desc: 'High-magnification solder fillet & alignment inspection' },
    { key: 'qualityCheck', label: 'Quality Assurance (IPC-A-610)', icon: ShieldCheck, desc: 'Strict multi-point QA checks and zero-defect validation' },
    { key: 'functionalTesting', label: 'Functional Electrical Testing', icon: Activity, desc: 'Dynamic bench testing & electrical load verification' },
    { key: 'maintenanceRepair', label: 'Board Maintenance & Diagnostics', icon: Settings, desc: 'Fault isolation, component swapping & circuit repair' },
    { key: 'componentSourcing', label: 'Component Sourcing Support', icon: Box, desc: 'Assistance sourcing missing SMD or PTH components' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceToggle = (key) => {
    setFormData(prev => ({
      ...prev,
      servicesRequested: {
        ...prev.servicesRequested,
        [key]: !prev.servicesRequested[key]
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone / WhatsApp number is required';
    if (!formData.projectTitle.trim()) newErrors.projectTitle = 'Project / Product Title is required';
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Please specify a valid quantity';
    }

    const selectedServicesCount = Object.values(formData.servicesRequested).filter(Boolean).length;
    if (selectedServicesCount === 0) {
      newErrors.services = 'Please select at least one service required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate PDF document using jsPDF
  const generatePDF = (data, reqId) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [0, 216, 255]; // #00d8ff cyan
    const darkBg = [15, 23, 42]; // dark navy slate
    const cardBg = [241, 245, 249]; // light gray card
    const textColor = [30, 41, 59];
    const lightText = [100, 116, 139];

    // Page Background / Header Banner
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 45, 'F');

    // Accent line below header
    doc.setFillColor(0, 216, 255);
    doc.rect(0, 45, 210, 2, 'F');

    // Brand Title Header
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('AEROSCAN TECHNOLOGIES', 14, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 216, 255);
    doc.text('PCB ASSEMBLY, RE-SOLDERING & ELECTRONIC MANUFACTURING SERVICES', 14, 26);

    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    doc.text('T&T Complex, TIP Colony, Haripur, KPK, Pakistan | +92 331 8180744', 14, 33);
    doc.text('Email: sarmad.quershi@aeroscan.com.pk | Web: www.aeroscantech.com', 14, 38);

    // Document Meta (Top Right)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0, 216, 255);
    doc.text('CUSTOMER REQUIREMENT SPECIFICATION', 130, 18, { align: 'left' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(`Ref ID: ${reqId}`, 130, 25);
    doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`, 130, 31);
    doc.text(`Status: SUBMITTED`, 130, 37);

    let yPos = 55;

    // Project & Client Info Section
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, yPos, 182, 36, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, yPos, 182, 36, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('CLIENT & PROJECT INFORMATION', 20, yPos + 8);

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);

    // Left Column
    doc.text(`Client Name:`, 20, yPos + 16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${data.fullName}`, 50, yPos + 16);

    doc.setFont('helvetica', 'normal');
    doc.text(`Company:`, 20, yPos + 23);
    doc.setFont('helvetica', 'bold');
    doc.text(`${data.companyName || 'N/A (Individual)'}`, 50, yPos + 23);

    doc.setFont('helvetica', 'normal');
    doc.text(`Email Address:`, 20, yPos + 30);
    doc.setFont('helvetica', 'bold');
    doc.text(`${data.email}`, 50, yPos + 30);

    // Right Column
    doc.setFont('helvetica', 'normal');
    doc.text(`Phone / WhatsApp:`, 110, yPos + 16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${data.phone}`, 150, yPos + 16);

    doc.setFont('helvetica', 'normal');
    doc.text(`Project Title:`, 110, yPos + 23);
    doc.setFont('helvetica', 'bold');
    doc.text(`${data.projectTitle}`, 150, yPos + 23);

    doc.setFont('helvetica', 'normal');
    doc.text(`Target Turnaround:`, 110, yPos + 30);
    doc.setFont('helvetica', 'bold');
    doc.text(`${data.turnaroundTime}`, 150, yPos + 30);

    yPos += 44;

    // Requested Services Section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('REQUESTED SERVICES', 14, yPos);
    yPos += 5;

    const activeServicesList = availableServices.filter(s => data.servicesRequested[s.key]);

    doc.setFillColor(241, 245, 249);
    doc.rect(14, yPos, 182, 6 + (activeServicesList.length * 6), 'F');
    doc.setDrawColor(203, 213, 225);
    doc.rect(14, yPos, 182, 6 + (activeServicesList.length * 6), 'D');

    let serviceY = yPos + 5;
    doc.setFontSize(9);
    activeServicesList.forEach((srv) => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 102, 204);
      doc.text('[X]', 20, serviceY);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(srv.label, 28, serviceY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(`—  ${srv.desc}`, 90, serviceY);
      serviceY += 6;
    });

    yPos += 12 + (activeServicesList.length * 6);

    // Hardware & Specifications Grid
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('HARDWARE & PCB SPECIFICATIONS', 14, yPos);
    yPos += 5;

    // Table Header
    doc.setFillColor(15, 23, 42);
    doc.rect(14, yPos, 182, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('Parameter', 20, yPos + 5.5);
    doc.text('Specification Detail', 105, yPos + 5.5);

    yPos += 8;

    const specs = [
      { label: 'Board Condition / Product State', value: data.boardCondition },
      { label: 'Batch / Unit Quantity', value: `${data.quantity} Units` },
      { label: 'PCB Layer Count', value: data.layerCount },
      { label: 'Board Dimensions (L x W)', value: data.boardDimensions || 'Standard / Unspecified' },
      { label: 'Component Mounting Style', value: data.mountingType },
      { label: 'Estimated SMT Count / Board', value: data.smtComponentCount || 'Not Specified' },
      { label: 'Estimated PTH Count / Board', value: data.pthComponentCount || 'Not Specified' },
      { label: 'Customer Provided BOM Kit', value: data.hasComponentBom }
    ];

    specs.forEach((item, index) => {
      const isEven = index % 2 === 0;
      doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
      doc.rect(14, yPos, 182, 7, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.line(14, yPos + 7, 196, yPos + 7);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      doc.text(item.label, 20, yPos + 5);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(String(item.value), 105, yPos + 5);

      yPos += 7;
    });

    yPos += 6;

    // Special Instructions Section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('SPECIAL INSTRUCTIONS & WORK SCOPE', 14, yPos);
    yPos += 5;

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, yPos, 182, 28, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, yPos, 182, 28, 2, 2, 'D');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);

    const instructionsText = data.specialInstructions.trim() 
      ? data.specialInstructions.trim() 
      : 'Standard customer-supplied assembly and rework guidelines apply. Microscopic inspection and functional testing to be performed prior to customer dispatch.';

    const splitText = doc.splitTextToSize(instructionsText, 174);
    doc.text(splitText, 18, yPos + 6);

    yPos += 35;

    // Footer Signature & Verification Block
    doc.setDrawColor(203, 213, 225);
    doc.line(14, yPos, 196, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('This specification sheet is generated automatically by Aeroscan Technologies Customer Portal.', 14, yPos);
    doc.text('For questions or technical engineering support, contact +92 331 8180744 or email sarmad.quershi@aeroscan.com.pk', 14, yPos + 5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 150, 200);
    doc.text('Aeroscan Quality Engineering Verification Mark', 135, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Certified IPC-A-610 Standards Compliant', 135, yPos + 5);

    return doc;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorEl = document.querySelector('.form-input--error');
      if (firstErrorEl) firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    const reqId = `REQ-${Date.now().toString().slice(-6)}`;
    const doc = generatePDF(formData, reqId);
    
    // Save PDF file to browser
    doc.save(`Aeroscan_PCB_Requirements_${reqId}.pdf`);

    // Create Blob URL for modal actions
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    setGeneratedPdfBlobUrl(blobUrl);

    setSubmittedData({ ...formData, reqId });
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const getEmailBody = () => {
    if (!submittedData) return '';
    const selectedSrvs = availableServices
      .filter(s => submittedData.servicesRequested[s.key])
      .map(s => ` - ${s.label}`)
      .join('\n');

    return encodeURIComponent(
`Hello Aeroscan Technologies Engineering Team,

I have submitted my Customer-Supplied PCB Service Requirements through your web portal. Below are the details of my request:

--------------------------------------------------
REQUIREMENT REFERENCE ID: ${submittedData.reqId}
--------------------------------------------------
CLIENT INFORMATION:
- Name: ${submittedData.fullName}
- Company: ${submittedData.companyName || 'Individual / N/A'}
- Email: ${submittedData.email}
- Phone / WhatsApp: ${submittedData.phone}
- Project Title: ${submittedData.projectTitle}

SERVICES REQUESTED:
${selectedSrvs}

HARDWARE SPECIFICATIONS:
- Board Condition: ${submittedData.boardCondition}
- Quantity: ${submittedData.quantity} Units
- Layer Count: ${submittedData.layerCount}
- Dimensions: ${submittedData.boardDimensions || 'Standard'}
- Component Mounting Style: ${submittedData.mountingType}
- Target Turnaround: ${submittedData.turnaroundTime}
- Component BOM Included: ${submittedData.hasComponentBom}

SPECIAL INSTRUCTIONS / REWORK DETAILS:
${submittedData.specialInstructions || 'N/A'}

Note: I have downloaded the generated PDF requirement document (Aeroscan_PCB_Requirements_${submittedData.reqId}.pdf) and attached it to this email.

Best regards,
${submittedData.fullName}
${submittedData.phone}`
    );
  };

  const getWhatsAppMessage = () => {
    if (!submittedData) return '';
    const selectedSrvs = availableServices
      .filter(s => submittedData.servicesRequested[s.key])
      .map(s => s.label)
      .join(', ');

    return encodeURIComponent(
`Hi Aeroscan Technologies! I just submitted PCB Requirements on your website:
📌 Ref ID: ${submittedData.reqId}
👤 Name: ${submittedData.fullName}
📦 Project: ${submittedData.projectTitle}
⚙️ Services: ${selectedSrvs}
🔢 Qty: ${submittedData.quantity} Units (${submittedData.boardCondition})

I have downloaded the requirements PDF and would like to proceed with the quote!`
    );
  };

  return (
    <main className="customer-req-page">
      {/* BANNER */}
      <div className="page-banner" id="customer-req-banner">
        <div className="container page-banner__content">
          <Link to="/customer-supplied-pcb.html" className="page-banner__back-link">
            <ArrowLeft size={16} />
            <span>Back to Customer-Supplied PCB Services</span>
          </Link>
          <div className="page-banner__label" style={{ marginTop: '0.75rem' }}>Client Engineering Portal</div>
          <h1 className="page-banner__title">
            Customer Product <span>Requirements Form</span>
          </h1>
          <p className="page-banner__desc">
            Specify your bare PCB, product assembly, re-soldering, physical inspection, QA, or testing requirements. Submitting this form generates an official PDF specification sheet sent to our engineering team.
          </p>
        </div>
      </div>

      <section className="section reveal-up">
        <div className="container">
          <div className="customer-req-grid">
            
            {/* LEFT COLUMN: THE FORM */}
            <div className="customer-req-main">
              <form onSubmit={handleSubmit} className="customer-req-form" noValidate>

                {/* STEP 1: CONTACT DETAILS */}
                <div className="form-card">
                  <div className="form-card__header">
                    <div className="form-card__badge">Step 1</div>
                    <h2 className="form-card__title">
                      <User className="form-card__title-icon" size={20} />
                      Client &amp; Contact Details
                    </h2>
                  </div>
                  <p className="form-card__desc">Provide your contact details so our engineers can send itemized quotes and technical feedback.</p>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName" className="form-label">
                        Full Name <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <User className="input-icon" size={18} />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
                          placeholder="e.g. Sarim Khan"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="companyName" className="form-label">
                        Company / Organization
                      </label>
                      <div className="input-with-icon">
                        <Building2 className="input-icon" size={18} />
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          className="form-input"
                          placeholder="e.g. Nexus Electronics Ltd. (Optional)"
                          value={formData.companyName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Mail className="input-icon" size={18} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                          placeholder="sarim@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone / WhatsApp <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Phone className="input-icon" size={18} />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                          placeholder="+92 3XX XXXXXXX"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.phone && <span className="field-error">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="projectTitle" className="form-label">
                      Project / Product Title <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="projectTitle"
                      name="projectTitle"
                      className={`form-input ${errors.projectTitle ? 'form-input--error' : ''}`}
                      placeholder="e.g. Inverter Control Board Assembly & Solder Reflow"
                      value={formData.projectTitle}
                      onChange={handleInputChange}
                    />
                    {errors.projectTitle && <span className="field-error">{errors.projectTitle}</span>}
                  </div>
                </div>

                {/* STEP 2: SERVICE SELECTION */}
                <div className="form-card">
                  <div className="form-card__header">
                    <div className="form-card__badge">Step 2</div>
                    <h2 className="form-card__title">
                      <Wrench className="form-card__title-icon" size={20} />
                      Required Services Selection <span className="req">*</span>
                    </h2>
                  </div>
                  <p className="form-card__desc">Select all processing, assembly, testing, or rework services required for your hardware.</p>

                  {errors.services && (
                    <div className="alert-banner alert-banner--error" style={{ marginBottom: '1rem' }}>
                      <AlertCircle size={18} />
                      <span>{errors.services}</span>
                    </div>
                  )}

                  <div className="services-checkbox-grid">
                    {availableServices.map((srv) => {
                      const SrvIcon = srv.icon;
                      const isChecked = formData.servicesRequested[srv.key];
                      return (
                        <div 
                          key={srv.key}
                          className={`service-check-card ${isChecked ? 'service-check-card--active' : ''}`}
                          onClick={() => handleServiceToggle(srv.key)}
                        >
                          <div className="service-check-card__top">
                            <div className="service-check-card__checkbox">
                              {isChecked && <Check size={14} className="service-check-card__check-icon" />}
                            </div>
                            <SrvIcon size={20} className="service-check-card__icon" />
                          </div>
                          <h3 className="service-check-card__title">{srv.label}</h3>
                          <p className="service-check-card__desc">{srv.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 3: HARDWARE & TECHNICAL SPECIFICATIONS */}
                <div className="form-card">
                  <div className="form-card__header">
                    <div className="form-card__badge">Step 3</div>
                    <h2 className="form-card__title">
                      <Layers className="form-card__title-icon" size={20} />
                      Hardware &amp; PCB Specifications
                    </h2>
                  </div>
                  <p className="form-card__desc">Tell us about the physical state and dimensions of your boards or products.</p>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="boardCondition" className="form-label">
                        Product / Board Condition <span className="req">*</span>
                      </label>
                      <select
                        id="boardCondition"
                        name="boardCondition"
                        className="form-select"
                        value={formData.boardCondition}
                        onChange={handleInputChange}
                      >
                        <option value="Bare PCB (Unassembled)">Bare PCB (Unassembled)</option>
                        <option value="Partially Assembled Board">Partially Assembled Board</option>
                        <option value="Fully Assembled PCB (For Rework/Repair)">Fully Assembled PCB (For Rework/Repair)</option>
                        <option value="Complete Electronic Device / Product">Complete Electronic Device / Product</option>
                        <option value="Prototype Board Batch">Prototype Board Batch</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="quantity" className="form-label">
                        Quantity (Units) <span className="req">*</span>
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        className={`form-input ${errors.quantity ? 'form-input--error' : ''}`}
                        placeholder="e.g. 25"
                        value={formData.quantity}
                        onChange={handleInputChange}
                      />
                      {errors.quantity && <span className="field-error">{errors.quantity}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="layerCount" className="form-label">
                        PCB Layer Count
                      </label>
                      <select
                        id="layerCount"
                        name="layerCount"
                        className="form-select"
                        value={formData.layerCount}
                        onChange={handleInputChange}
                      >
                        <option value="1 Layer (Single Sided)">1 Layer (Single Sided)</option>
                        <option value="2 Layers (Double Sided)">2 Layers (Double Sided)</option>
                        <option value="4 Layers">4 Layers</option>
                        <option value="6 Layers">6 Layers</option>
                        <option value="8+ Multilayer">8+ Multilayer</option>
                        <option value="Flex / Rigid-Flex">Flex / Rigid-Flex PCB</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="boardDimensions" className="form-label">
                        Board Dimensions (mm or inches)
                      </label>
                      <input
                        type="text"
                        id="boardDimensions"
                        name="boardDimensions"
                        className="form-input"
                        placeholder="e.g. 120mm x 80mm"
                        value={formData.boardDimensions}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="mountingType" className="form-label">
                        Component Mounting Style
                      </label>
                      <select
                        id="mountingType"
                        name="mountingType"
                        className="form-select"
                        value={formData.mountingType}
                        onChange={handleInputChange}
                      >
                        <option value="Mixed (SMT + Through-Hole)">Mixed (SMT + Through-Hole)</option>
                        <option value="SMT (Surface Mount Only)">SMT (Surface Mount Only)</option>
                        <option value="Through-Hole (PTH Only)">Through-Hole (PTH Only)</option>
                        <option value="Fine-Pitch / BGA Only Rework">Fine-Pitch / BGA Only Rework</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="turnaroundTime" className="form-label">
                        Target Turnaround
                      </label>
                      <select
                        id="turnaroundTime"
                        name="turnaroundTime"
                        className="form-select"
                        value={formData.turnaroundTime}
                        onChange={handleInputChange}
                      >
                        <option value="Standard (3-5 Business Days)">Standard (3-5 Business Days)</option>
                        <option value="Express Rework (< 48 Hours)">Express Rework (&lt; 48 Hours)</option>
                        <option value="Scheduled Production Batch">Scheduled Production Batch</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="smtComponentCount" className="form-label">
                        Est. SMT Components / Board
                      </label>
                      <input
                        type="text"
                        id="smtComponentCount"
                        name="smtComponentCount"
                        className="form-input"
                        placeholder="e.g. 45 components"
                        value={formData.smtComponentCount}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="hasComponentBom" className="form-label">
                        Are Components Provided in Kit?
                      </label>
                      <select
                        id="hasComponentBom"
                        name="hasComponentBom"
                        className="form-select"
                        value={formData.hasComponentBom}
                        onChange={handleInputChange}
                      >
                        <option value="Yes (Full Kit Furnished)">Yes (Full Kit Furnished by Client)</option>
                        <option value="Partial (Client + Aeroscan Sourced)">Partial (Client + Aeroscan Sourced)</option>
                        <option value="No (Aeroscan Sourced SMT Components)">No (Aeroscan Sourced Components)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* STEP 4: SPECIAL INSTRUCTIONS */}
                <div className="form-card">
                  <div className="form-card__header">
                    <div className="form-card__badge">Step 4</div>
                    <h2 className="form-card__title">
                      <FileText className="form-card__title-icon" size={20} />
                      Special Work Instructions &amp; Testing Notes
                    </h2>
                  </div>
                  <p className="form-card__desc">Specify any solder reflow temperatures, functional test parameters, or custom rework guidelines.</p>

                  <div className="form-group">
                    <textarea
                      id="specialInstructions"
                      name="specialInstructions"
                      className="form-textarea"
                      rows={5}
                      placeholder="Please describe specific assembly requirements, micro-soldering instructions, defective solder joints to rework, or operational test voltage/signals..."
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  {/* FORM SUBMISSION BAR */}
                  <div className="form-submit-bar">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn--primary btn--lg form-submit-btn"
                    >
                      {isSubmitting ? (
                        <>Generating PDF...</>
                      ) : (
                        <>
                          <Download size={20} />
                          <span>Generate PDF &amp; Submit Requirements</span>
                        </>
                      )}
                    </button>
                    <div className="form-submit-note">
                      <CheckCircle2 size={16} className="text-accent" />
                      <span>Instantly generates official PDF document + triggers direct email dispatch to Aeroscan engineering team.</span>
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* RIGHT COLUMN: SIDEBAR HELP & SUMMARY */}
            <div className="customer-req-sidebar">
              
              {/* BRAND PROMISE CARD */}
              <div className="req-sidebar-card">
                <div className="req-sidebar-card__icon-wrap">
                  <Sparkles size={24} className="text-accent" />
                </div>
                <h3 className="req-sidebar-card__title">Aeroscan Quality Assurance</h3>
                <p className="req-sidebar-card__text">
                  All customer-supplied boards are processed under strict ESD-safe anti-static conditions according to IPC-A-610 standards.
                </p>
                <ul className="req-sidebar-list">
                  <li>
                    <CheckCircle2 size={16} className="text-accent" />
                    <span>Optical Microscopic Inspection</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-accent" />
                    <span>Dynamic Electrical Continuity Test</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-accent" />
                    <span>NDAs &amp; Technical IP Protection</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-accent" />
                    <span>Rapid Turnaround Options</span>
                  </li>
                </ul>
              </div>

              {/* DIRECT CONTACT CARD */}
              <div className="req-sidebar-card" style={{ background: 'var(--clr-surface-card)' }}>
                <h3 className="req-sidebar-card__title">Need Engineering Help?</h3>
                <p className="req-sidebar-card__text">
                  Have questions about board compatibility or component kit preparation? Speak directly with our lead technician.
                </p>
                <div className="sidebar-contact-info">
                  <div className="sidebar-contact-item">
                    <Phone size={16} className="text-accent" />
                    <span>+92 331 8180744</span>
                  </div>
                  <div className="sidebar-contact-item">
                    <Mail size={16} className="text-accent" />
                    <span>sarmad.quershi@aeroscan.com.pk</span>
                  </div>
                  <div className="sidebar-contact-item">
                    <Clock size={16} className="text-accent" />
                    <span>Mon–Sun · 24/7 Support</span>
                  </div>
                </div>
                <a 
                  href="https://wa.me/923318180744" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm btn--block"
                  style={{ marginTop: '1rem', borderColor: '#25D366', color: '#25D366' }}
                >
                  <MessageSquare size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      {showSuccessModal && submittedData && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <div className="modal-success-icon">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="modal-title">Requirement Form (PDF) Generated!</h2>
              <p className="modal-subtitle">
                Reference ID: <strong className="text-accent">{submittedData.reqId}</strong>
              </p>
            </div>

            <div className="modal-body">
              <p className="modal-text">
                Your official requirement specification PDF file (<strong>Aeroscan_PCB_Requirements_{submittedData.reqId}.pdf</strong>) has been generated and saved to your device download folder!
              </p>

              <div className="modal-step-box">
                <div className="modal-step-item">
                  <div className="modal-step-num">1</div>
                  <div className="modal-step-text">
                    <strong>Check Download Folder:</strong> Verify the downloaded PDF document contains all your product specs.
                  </div>
                </div>
                <div className="modal-step-item">
                  <div className="modal-step-num">2</div>
                  <div className="modal-step-text">
                    <strong>Email Dispatch to Aeroscan:</strong> Click below to launch your email client with prefilled project details to <strong>sarmad.quershi@aeroscan.com.pk</strong> and attach your downloaded PDF.
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <a
                href={`mailto:sarmad.quershi@aeroscan.com.pk?subject=${encodeURIComponent(`Customer PCB Requirements - ${submittedData.projectTitle} (${submittedData.reqId})`)}&body=${getEmailBody()}`}
                className="btn btn--primary btn--block modal-btn"
              >
                <Mail size={18} />
                <span>Open Email to Send PDF</span>
              </a>

              <a
                href={`https://wa.me/923318180744?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--block modal-btn"
                style={{ borderColor: '#25D366', color: '#25D366' }}
              >
                <MessageSquare size={18} />
                <span>Send via WhatsApp</span>
              </a>

              {generatedPdfBlobUrl && (
                <a
                  href={generatedPdfBlobUrl}
                  download={`Aeroscan_PCB_Requirements_${submittedData.reqId}.pdf`}
                  className="btn btn--outline btn--block modal-btn"
                >
                  <Download size={18} />
                  <span>Download PDF Again</span>
                </a>
              )}

              <button
                type="button"
                className="btn btn--text btn--block"
                style={{ marginTop: '0.5rem', color: 'var(--clr-text-muted)' }}
                onClick={() => setShowSuccessModal(false)}
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}

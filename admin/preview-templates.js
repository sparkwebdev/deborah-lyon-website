// Netlify CMS Preview Templates with Custom Styles

// Register preview styles - this injects your site's CSS into the preview pane
CMS.registerPreviewStyle("../style.css");

// Optional: Create custom preview templates for better content editing experience

// About Section Preview
const AboutPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  return `
    <div class="section">
      <div class="container">
        <div class="about-content">
          <div class="about-image">
            <img src="${data.profileImage}" alt="Deborah Lyon" />
          </div>
          <div class="about-text">
            <p>${data.intro1 || ''}</p>
            <p>${data.intro2 || ''}</p>
            ${data.featureHighlight ? `<p class="feature-highlight">${data.featureHighlight}</p>` : ''}

            ${data.extendedBio ? `
              <div class="read-more-content show">
                ${data.extendedBio.map(item => `<p>${item.text}</p>`).join('')}
                ${data.treatments ? `
                  <ul class="tick-list">
                    ${data.treatments.map(item => `<li>✓ ${item.item}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
};

// Service Preview
const ServicePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  return `
    <div class="card service-card">
      <div class="service-image">
        <img src="${data.image}" alt="${data.title}" />
      </div>
      <div class="service-content">
        <h3>${data.title}</h3>
        <p>${data.description}</p>
      </div>
    </div>
  `;
};

// Review/Testimonial Preview
const ReviewPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  const stars = '★'.repeat(parseInt(data.rating || 5));

  return `
    <div class="reviews__item bg-mid active">
      <div class="reviews__author">${data.author || 'Anonymous'}</div>
      <div class="reviews__date">${data.date || ''}</div>
      <div class="reviews__stars">${stars}</div>
      <div class="reviews__title">${data.title || ''}</div>
      <div class="reviews__text">"${data.text || ''}"</div>
    </div>
  `;
};

// Hero Section Preview
const HeroPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  return `
    <section class="hero" style="background-image: url('${data.backgroundImage}')">
      <div class="container">
        <div class="hero__content">
          <p class="hero__quote">${data.quote || ''}</p>
          <a href="${data.buttonLink}" class="btn" target="_blank">${data.buttonText || 'Book Now'}</a>
        </div>
      </div>
    </section>
  `;
};

// Benefits Section Preview
const BenefitsPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  return `
    <div class="section bg-light">
      <div class="container">
        <div class="benefits__grid">
          <div class="benefits__image">
            <img src="${data.image}" alt="Lymphatic drainage" />
          </div>
          <div class="benefits__intro text-left">
            <h3>${data.heading || ''}</h3>
            <p>${data.description1 || ''}</p>
            <p>${data.description2 || ''}</p>
          </div>
        </div>

        <div class="benefits__box bg-mid">
          <h3>${data.boxTitle || 'Benefits of lymphatic drainage'}</h3>
          ${data.benefitsList ? `
            <ul class="tick-list benefits__list">
              ${data.benefitsList.map(item => `<li>✓ ${item.item}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      </div>
    </div>
  `;
};

// Book Now Section Preview
const BookNowPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  return `
    <section class="book-now bg-brand-gradient">
      <div class="container">
        <h2>${data.heading1 || 'Ready to Begin Your Healing Journey?'}</h2>
        <p class="text-balance">${data.description1 || ''}</p>
        <a href="${data.buttonLink}" class="btn btn--inverted" target="_blank">${data.buttonText || 'Book Now'}</a>
      </div>
    </section>
  `;
};

// Contact Section Preview
const ContactPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  return `
    <div class="section bg-light">
      <div class="container">
        <h2>${data.heading || 'Get In Touch'}</h2>
        <div class="contact">
          <div class="contact__details">
            <h3>Contact Details</h3>
            <p><strong>Phone:</strong> ${data.phone || ''}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email || ''}</a></p>
            <p><strong>Address:</strong><br>
            ${data.address1 || ''}<br>
            ${data.address2 || ''}<br>
            ${data.address3 || ''}<br>
            ${data.postcode || ''}</p>
          </div>

          <div class="contact__map">
            <img src="${data.mapImage}" alt="Map Location" />
          </div>

          <div class="contact__hours">
            <h3>Opening Hours</h3>
            ${data.hours ? data.hours.map(hour => `
              <div class="contact__day">
                <span>${hour.day}</span>
                <span>${hour.time}</span>
              </div>
            `).join('') : ''}
          </div>
        </div>
      </div>
    </div>
  `;
};

// Gallery Preview
const GalleryPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  return `
    <div class="card card--image-only">
      <img src="${data.image}" alt="${data.alt || 'Gallery image'}" />
    </div>
  `;
};

// Membership Logo Preview
const MembershipPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  return `
    <div style="text-align: center; padding: 20px;">
      <img src="${data.logo}" alt="${data.name}" class="memberships__logo" title="${data.name}" />
      <p><strong>${data.name}</strong></p>
      ${data.url ? `<p><a href="${data.url}" target="_blank">Visit Website</a></p>` : ''}
      <p><small>Show in header: ${data.showInHeader ? 'Yes' : 'No'}</small></p>
      <p><small>Show in footer: ${data.showInFooter ? 'Yes' : 'No'}</small></p>
    </div>
  `;
};

// Gift Panel Preview
const GiftPanelPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  return `
    <section class="gift-panel bg-brand">
      <div class="container gift-panel__content">
        <img src="${data.icon}" alt="" class="gift-panel__icon" />
        <p class="gift-panel__text">${data.message || ''}</p>
        <a href="${data.buttonLink}" class="btn btn--inverted btn--small" target="_blank">${data.buttonText || 'Buy Now'}</a>
      </div>
    </section>
  `;
};

// Register all preview templates
CMS.registerPreviewTemplate("about", AboutPreview);
CMS.registerPreviewTemplate("hero", HeroPreview);
CMS.registerPreviewTemplate("benefits", BenefitsPreview);
CMS.registerPreviewTemplate("bookNow", BookNowPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);
CMS.registerPreviewTemplate("giftPanel", GiftPanelPreview);
CMS.registerPreviewTemplate("services", ServicePreview);
CMS.registerPreviewTemplate("reviews", ReviewPreview);
CMS.registerPreviewTemplate("gallery", GalleryPreview);
CMS.registerPreviewTemplate("memberships", MembershipPreview);

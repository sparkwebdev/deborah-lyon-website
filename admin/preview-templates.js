// Netlify CMS Preview Templates with Custom Styles

// Register preview styles - this injects your site's CSS into the preview pane
CMS.registerPreviewStyle("../style.css");

// Create React elements using the CMS's createClass and h function
const h = CMS.h;

// Gallery Preview
const GalleryPreview = CMS.createClass({
  render: function() {
    const entry = this.props.entry;
    const image = entry.getIn(['data', 'image']);
    const alt = entry.getIn(['data', 'alt']) || 'Gallery image';

    return h('div', { className: 'card card--image-only' },
      h('img', { src: image, alt: alt })
    );
  }
});

// Service Preview
const ServicePreview = CMS.createClass({
  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']);
    const image = entry.getIn(['data', 'image']);
    const description = entry.getIn(['data', 'description']);

    return h('div', { className: 'card service-card' },
      h('div', { className: 'service-image' },
        h('img', { src: image, alt: title })
      ),
      h('div', { className: 'service-content' },
        h('h3', {}, title),
        h('p', {}, description)
      )
    );
  }
});

// Review/Testimonial Preview
const ReviewPreview = CMS.createClass({
  render: function() {
    const entry = this.props.entry;
    const author = entry.getIn(['data', 'author']) || 'Anonymous';
    const date = entry.getIn(['data', 'date']) || '';
    const rating = entry.getIn(['data', 'rating']) || '5';
    const title = entry.getIn(['data', 'title']) || '';
    const text = entry.getIn(['data', 'text']) || '';
    const stars = '★'.repeat(parseInt(rating));

    return h('div', { className: 'reviews__item bg-mid active' },
      h('div', { className: 'reviews__author' }, author),
      h('div', { className: 'reviews__date' }, date),
      h('div', { className: 'reviews__stars' }, stars),
      h('div', { className: 'reviews__title' }, title),
      h('div', { className: 'reviews__text' }, '"' + text + '"')
    );
  }
});

// Hero Section Preview
const HeroPreview = CMS.createClass({
  render: function() {
    const entry = this.props.entry;
    const quote = entry.getIn(['data', 'quote']) || '';
    const buttonText = entry.getIn(['data', 'buttonText']) || 'Book Now';
    const buttonLink = entry.getIn(['data', 'buttonLink']) || '#';
    const backgroundImage = entry.getIn(['data', 'backgroundImage']) || '';

    return h('section', {
      className: 'hero',
      style: { backgroundImage: 'url(' + backgroundImage + ')' }
    },
      h('div', { className: 'container' },
        h('div', { className: 'hero__content' },
          h('p', { className: 'hero__quote' }, quote),
          h('a', {
            href: buttonLink,
            className: 'btn',
            target: '_blank'
          }, buttonText)
        )
      )
    );
  }
});

// About Section Preview
const AboutPreview = CMS.createClass({
  render: function() {
    const entry = this.props.entry;
    const profileImage = entry.getIn(['data', 'profileImage']) || '';
    const intro1 = entry.getIn(['data', 'intro1']) || '';
    const intro2 = entry.getIn(['data', 'intro2']) || '';
    const featureHighlight = entry.getIn(['data', 'featureHighlight']) || '';
    const extendedBio = entry.getIn(['data', 'extendedBio']);
    const treatments = entry.getIn(['data', 'treatments']);

    // Build extended bio paragraphs
    const bioElements = [];
    if (extendedBio) {
      extendedBio.forEach((item, i) => {
        bioElements.push(h('p', { key: 'bio-' + i }, item.get('text')));
      });
    }

    // Build treatments list
    const treatmentElements = [];
    if (treatments) {
      treatments.forEach((item, i) => {
        treatmentElements.push(h('li', { key: 'treatment-' + i }, '✓ ' + item.get('item')));
      });
    }

    return h('div', { className: 'section' },
      h('div', { className: 'container' },
        h('div', { className: 'about-content' },
          h('div', { className: 'about-image' },
            h('img', { src: profileImage, alt: 'Deborah Lyon' })
          ),
          h('div', { className: 'about-text' },
            h('p', {}, intro1),
            h('p', {}, intro2),
            featureHighlight ? h('p', { className: 'feature-highlight' }, featureHighlight) : null,
            extendedBio ? h('div', { className: 'read-more-content show' },
              bioElements,
              treatments ? h('ul', { className: 'tick-list' }, treatmentElements) : null
            ) : null
          )
        )
      )
    );
  }
});

// Benefits Section Preview
const BenefitsPreview = CMS.createClass({
  render: function() {
    const entry = this.props.entry;
    const image = entry.getIn(['data', 'image']) || '';
    const heading = entry.getIn(['data', 'heading']) || '';
    const description1 = entry.getIn(['data', 'description1']) || '';
    const description2 = entry.getIn(['data', 'description2']) || '';
    const boxTitle = entry.getIn(['data', 'boxTitle']) || 'Benefits of lymphatic drainage';
    const benefitsList = entry.getIn(['data', 'benefitsList']);

    // Build benefits list items
    const benefitsElements = [];
    if (benefitsList) {
      benefitsList.forEach((item, i) => {
        benefitsElements.push(h('li', { key: 'benefit-' + i }, '✓ ' + item.get('item')));
      });
    }

    return h('div', { className: 'section bg-light' },
      h('div', { className: 'container' },
        h('div', { className: 'benefits__grid' },
          h('div', { className: 'benefits__image' },
            h('img', { src: image, alt: 'Lymphatic drainage' })
          ),
          h('div', { className: 'benefits__intro text-left' },
            h('h3', {}, heading),
            h('p', {}, description1),
            h('p', {}, description2)
          )
        ),
        h('div', { className: 'benefits__box bg-mid' },
          h('h3', {}, boxTitle),
          benefitsList ? h('ul', { className: 'tick-list benefits__list' }, benefitsElements) : null
        )
      )
    );
  }
});

// Book Now Section Preview
const BookNowPreview = CMS.createClass({
  render: function() {
    const entry = this.props.entry;
    const heading1 = entry.getIn(['data', 'heading1']) || 'Ready to Begin Your Healing Journey?';
    const description1 = entry.getIn(['data', 'description1']) || '';
    const buttonText = entry.getIn(['data', 'buttonText']) || 'Book Now';
    const buttonLink = entry.getIn(['data', 'buttonLink']) || '#';

    return h('section', { className: 'book-now bg-brand-gradient' },
      h('div', { className: 'container' },
        h('h2', {}, heading1),
        h('p', { className: 'text-balance' }, description1),
        h('a', {
          href: buttonLink,
          className: 'btn btn--inverted',
          target: '_blank'
        }, buttonText)
      )
    );
  }
});

// Contact Section Preview
const ContactPreview = CMS.createClass({
  render: function() {
    const entry = this.props.entry;
    const heading = entry.getIn(['data', 'heading']) || 'Get In Touch';
    const phone = entry.getIn(['data', 'phone']) || '';
    const email = entry.getIn(['data', 'email']) || '';
    const address1 = entry.getIn(['data', 'address1']) || '';
    const address2 = entry.getIn(['data', 'address2']) || '';
    const address3 = entry.getIn(['data', 'address3']) || '';
    const postcode = entry.getIn(['data', 'postcode']) || '';
    const mapImage = entry.getIn(['data', 'mapImage']) || '';
    const hours = entry.getIn(['data', 'hours']);

    // Build hours list
    const hoursElements = [];
    if (hours) {
      hours.forEach((hour, i) => {
        hoursElements.push(
          h('div', { className: 'contact__day', key: 'hour-' + i },
            h('span', {}, hour.get('day')),
            h('span', {}, hour.get('time'))
          )
        );
      });
    }

    return h('div', { className: 'section bg-light' },
      h('div', { className: 'container' },
        h('h2', {}, heading),
        h('div', { className: 'contact' },
          h('div', { className: 'contact__details' },
            h('h3', {}, 'Contact Details'),
            h('p', {}, h('strong', {}, 'Phone: '), phone),
            h('p', {},
              h('strong', {}, 'Email: '),
              h('a', { href: 'mailto:' + email }, email)
            ),
            h('p', {},
              h('strong', {}, 'Address:'),
              h('br', {}),
              address1, h('br', {}),
              address2, h('br', {}),
              address3, h('br', {}),
              postcode
            )
          ),
          h('div', { className: 'contact__map' },
            h('img', { src: mapImage, alt: 'Map Location' })
          ),
          h('div', { className: 'contact__hours' },
            h('h3', {}, 'Opening Hours'),
            hoursElements
          )
        )
      )
    );
  }
});

// Gift Panel Preview
const GiftPanelPreview = CMS.createClass({
  render: function() {
    const entry = this.props.entry;
    const icon = entry.getIn(['data', 'icon']) || '';
    const message = entry.getIn(['data', 'message']) || '';
    const buttonText = entry.getIn(['data', 'buttonText']) || 'Buy Now';
    const buttonLink = entry.getIn(['data', 'buttonLink']) || '#';

    return h('section', { className: 'gift-panel bg-brand' },
      h('div', { className: 'container gift-panel__content' },
        h('img', { src: icon, alt: '', className: 'gift-panel__icon' }),
        h('p', { className: 'gift-panel__text' }, message),
        h('a', {
          href: buttonLink,
          className: 'btn btn--inverted btn--small',
          target: '_blank'
        }, buttonText)
      )
    );
  }
});

// Membership Logo Preview
const MembershipPreview = CMS.createClass({
  render: function() {
    const entry = this.props.entry;
    const name = entry.getIn(['data', 'name']) || '';
    const logo = entry.getIn(['data', 'logo']) || '';
    const url = entry.getIn(['data', 'url']) || '';
    const showInHeader = entry.getIn(['data', 'showInHeader']);
    const showInFooter = entry.getIn(['data', 'showInFooter']);

    return h('div', { style: { textAlign: 'center', padding: '20px' } },
      h('img', {
        src: logo,
        alt: name,
        className: 'memberships__logo',
        title: name
      }),
      h('p', {}, h('strong', {}, name)),
      url ? h('p', {}, h('a', { href: url, target: '_blank' }, 'Visit Website')) : null,
      h('p', {}, h('small', {}, 'Show in header: ' + (showInHeader ? 'Yes' : 'No'))),
      h('p', {}, h('small', {}, 'Show in footer: ' + (showInFooter ? 'Yes' : 'No')))
    );
  }
});

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

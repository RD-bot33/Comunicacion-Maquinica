// DATA: Blog Posts
const posts = [
  {
    href: "post-acta-nacimiento.html",
    image: "manifestaciones_visuales/acta-nacimiento-visual.png",
    thumb_aria_label: "Patrones de red y códigos",
    tag: "manifiesto",
    title: "Acta de nacimiento: Comunicación Maquínica",
    description: "La computadora como mediador semiótico: del símbolo a la instrucción y de vuelta al sentido."
  },
  {
    href: "post-pantallita-negra.html",
    image: "manifestaciones_visuales/pantallita-negra-visual.png",
    thumb_aria_label: "Ondas y matriz digital",
    tag: "campo",
    title: "La pantallita negra como rito de inicio",
    description: "Terminal: puerto de acceso directo al inconsciente de la máquina. Anotaciones y prácticas."
  },
  {
    href: "post-prototipos-conversacionales.html",
    image: "manifestaciones_visuales/prototipos-conversacionales-visual.png",
    thumb_aria_label: "Interfaz conversacional",
    tag: "laboratorio",
    title: "Prototipos conversacionales con IA",
    description: "Del prompt al protocolo poético: pautas para experimentar sin perder rigor."
  }
];

// RENDERER: Blog Posts
function renderBlogPosts() {
  const blogGrid = document.getElementById('blog-grid');
  if (!blogGrid) return; // Exit if the container doesn't exist

  const postHtml = posts.map(post => `
    <a href="${post.href}" class="card-link">
      <article class="card">
        <img src="${post.image}" alt="${post.title}" class="thumb-image" loading="lazy">
        <div class="content">
          <span class="tag">${post.tag}</span>
          <h3 style="margin:6px 0 8px">${post.title}</h3>
          <p style="color:var(--muted); margin:0">${post.description}</p>
        </div>
      </article>
    </a>
  `).join('');

  blogGrid.innerHTML = postHtml;
}

// year
document.getElementById('year').textContent = new Date().getFullYear();

// scrollspy for header links
const sections = [...document.querySelectorAll('section')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const spy = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const id = '#' + e.target.id;
      navLinks.forEach(a=>{ a.classList.toggle('active', a.getAttribute('href')===id); });
    }
  })
},{rootMargin:"-40% 0px -55% 0px", threshold:0});
sections.forEach(s=> spy.observe(s));



// Code Copy Functionality
function setupCodeCopy() {
  const postBody = document.querySelector('.post-body');
  if (!postBody) return; // Only run on post pages

  const codeBlocks = postBody.querySelectorAll('pre');
  codeBlocks.forEach(codeBlock => {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';
    
    // Wrap the code block
    if (codeBlock.parentNode) {
      codeBlock.parentNode.insertBefore(wrapper, codeBlock);
      wrapper.appendChild(codeBlock);
    }

    // Create and add the copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-btn';
    copyButton.textContent = 'Copiar';
    wrapper.insertBefore(copyButton, codeBlock);

    // Add click listener
    copyButton.addEventListener('click', () => {
      const codeToCopy = codeBlock.querySelector('code').textContent;
      navigator.clipboard.writeText(codeToCopy).then(() => {
        copyButton.textContent = '¡Copiado!';
        copyButton.classList.add('copied');
        setTimeout(() => {
          copyButton.textContent = 'Copiar';
          copyButton.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Error al copiar el código: ', err);
        copyButton.textContent = 'Error';
      });
    });
  });
}

// Form Submission Handler
function setupForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.classList.add('loading');
    status.style.display = 'none';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.innerHTML = "¡Gracias por tu mensaje!";
        status.style.color = 'var(--accent2)';
        form.reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! Hubo un problema al enviar tu formulario";
        }
        status.style.color = 'var(--danger)';
      }
    } catch (error) {
      status.innerHTML = "Oops! Hubo un problema al enviar tu formulario";
      status.style.color = 'var(--danger)';
    } finally {
      form.classList.remove('loading');
      status.style.display = 'block';
    }
  });
}

// Initial Render & Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Render blog posts
  renderBlogPosts();

  // Set up smooth scroll for all trigger links
  const scrollTriggers = document.querySelectorAll('.js-scroll-trigger');
  scrollTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Set up code copy buttons
  setupCodeCopy();

  // Set up form handler
  setupForm();
});

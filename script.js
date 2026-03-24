/* ==========================================
   1. MENU MOBILE RESPONSIVO
   ========================================== */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

/* ==========================================
   2. ANIMAÇÃO DE APARECER AO ROLAR (SCROLL REVEAL)
   ========================================== */
// Seleciona todos os elementos que têm a classe .reveal
const revealElements = document.querySelectorAll('.reveal');

// Cria o "Olheiro" para ver quando os elementos entram na tela
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Se o elemento entrou na tela (isIntersecting)
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); // Adiciona a classe que faz a animação acontecer
            observer.unobserve(entry.target); // Para de observar depois que animou a 1ª vez
        }
    });
}, {
    root: null,
    threshold: 0.15, // Dispara a animação quando 15% do elemento estiver visível
    rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes de chegar na borda inferior
});

// Pede para o Olheiro vigiar todos os elementos reveal
revealElements.forEach(el => revealObserver.observe(el));

/* ==========================================
   3. ANIMAÇÃO DOS NÚMEROS (HARMONIZADA POR TEMPO)
   ========================================== */
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    // PADRONIZAÇÃO: A animação de todos os números vai durar exatamente 1.5 segundos
    const duracaoTotal = 1500; 
    const intervaloFrame = 20; // A tela atualiza a cada 20 milissegundos
    const totalDePassos = duracaoTotal / intervaloFrame;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let passoAtual = 0;

        const updateCount = setInterval(() => {
            passoAtual++;
            
            // Calcula qual a porcentagem da animação já foi concluída (ex: 0.1, 0.5, 1.0)
            const progresso = passoAtual / totalDePassos;
            
            // Multiplica o número final pela porcentagem (Garante que tudo ande junto)
            counter.innerText = Math.round(target * progresso);

            // Quando chegar em 100%, desliga o cronômetro para economizar memória
            if (passoAtual >= totalDePassos) {
                clearInterval(updateCount);
                counter.innerText = target; // Crava o número exato final
            }
        }, intervaloFrame);
    });
};

// O Olheiro que dispara os números continua o mesmo
const statsSection = document.querySelector('.authority');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    }, { threshold: 0.5 }); 

    statsObserver.observe(statsSection);
}


/* ==========================================
   4. VALIDAÇÃO DO FORMULÁRIO (SEM RECARREGAR A PÁGINA)
   ========================================== */
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', function(evento) {
        evento.preventDefault(); 

        let formularioValido = true;
        const formGroups = contactForm.querySelectorAll('.form-group');

        formGroups.forEach(group => group.classList.remove('error'));

        const nome = document.getElementById('nome');
        if (nome.value.trim() === '') {
            nome.parentElement.classList.add('error');
            formularioValido = false;
        }

        const email = document.getElementById('email');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email.value.trim())) {
            email.parentElement.classList.add('error');
            formularioValido = false;
        }

        const mensagem = document.getElementById('mensagem');
        if (mensagem.value.trim() === '') {
            mensagem.parentElement.classList.add('error');
            formularioValido = false;
        }

        if (formularioValido) {
            formFeedback.classList.add('show');
            contactForm.reset();

            setTimeout(() => {
                formFeedback.classList.remove('show');
            }, 5000);
        }
    });
}
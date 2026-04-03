document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. MENU MOBILE (SANDUÍCHE)
       ========================================================================== */
    const btnMobile = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (btnMobile && navMenu) {
        btnMobile.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animação do ícone sanduíche se transformando em 'X'
            const bars = btnMobile.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Fecha o menu mobile automaticamente ao clicar em qualquer link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const bars = btnMobile.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        });
    }

    /* ==========================================================================
       2. ACESSIBILIDADE: ALTERNÂNCIA DE TEMA (LIGHT/DARK)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Recupera a preferência de tema salva anteriormente no navegador do usuário
    const savedTheme = localStorage.getItem('lacase-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeButtonText(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('lacase-theme', newTheme);
            updateThemeButtonText(newTheme);
        });
    }

    function updateThemeButtonText(theme) {
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'light' ? '🌓 Tema Escuro' : '☀️ Tema Claro';
        }
    }

    /* ==========================================================================
       3. ACESSIBILIDADE: CONTROLE DE TAMANHO DA FONTE
       ========================================================================== */
    const btnFontUp = document.getElementById('font-up');
    const btnFontDown = document.getElementById('font-down');
    let currentFontSize = 100; // Porcentagem padrão (100%)

    if (btnFontUp) {
        btnFontUp.addEventListener('click', () => {
            // Limita o aumento para não quebrar excessivamente o layout (máx 130%)
            if (currentFontSize < 130) {
                currentFontSize += 10;
                document.body.style.fontSize = currentFontSize + '%';
            }
        });
    }

    if (btnFontDown) {
        btnFontDown.addEventListener('click', () => {
            // Limita a redução para manter a legibilidade (mín 90%)
            if (currentFontSize > 90) {
                currentFontSize -= 10;
                document.body.style.fontSize = currentFontSize + '%';
            }
        });
    }

    /* ==========================================================================
       4. FILTRO DINÂMICO (PÁGINA DE PRODUÇÕES E PESQUISA)
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const producaoItems = document.querySelectorAll('.producao-item');

    if (filterButtons.length > 0 && producaoItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove a classe ativa de todos os botões e adiciona no clicado
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                producaoItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    // Lógica de filtro com animação suave de opacidade
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        // Delay mínimo para permitir que o navegador processe o display: block antes da transição
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        // Aguarda a transição do CSS terminar (300ms) para remover o elemento do fluxo visual
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('confirmationForm');
    const guestNameField = document.getElementById('guest-name-field');

    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) value = '(' + value;
        if (value.length > 3) value = value.substring(0, 3) + ') ' + value.substring(3);
        if (value.length > 10) value = value.substring(0, 10) + '-' + value.substring(10, 14);
        e.target.value = value;
    });

    // Envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores dos campos
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value;
        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        const guestName = document.getElementById('guest-name')?.value.trim() || '';
        const message = document.getElementById('message').value.trim();
        
        // Validar telefone
        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            alert('Por favor, insira um número de WhatsApp válido no formato (00) 00000-0000');
            return;
        }
        
        // Número do aniversariante (seu número)
        const yourWhatsappNumber = "79981041878"; // Substitua pelo seu número com DDD
        
        // Criar mensagem com emojis
        let whatsappMessage = `🎉 CONFIRMAÇÃO DE ANIVERSÁRIO! 🎉\n\n`;
        whatsappMessage += `👤 Nome: ${name}\n`;
        whatsappMessage += `✅ Presença: ${attendance === 'sim' ? 'CONFIRMADA' : 'NÃO confirmada'}\n`;
        
        if (message) {
            whatsappMessage += `\n💌 Mensagem:\n"${message}"\n`;
        }
        
        // Codificar a mensagem para URL (usando encodeURIComponent)
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Criar link do WhatsApp
        const whatsappUrl = `https://wa.me/55${yourWhatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Atualizar contador
        const countElement = document.getElementById('confirmed-count');
        if (countElement) {
            countElement.textContent = parseInt(countElement.textContent) + 1;
        }
        
        // Resetar formulário
        form.reset();
        guestNameField.style.display = 'none';
        
        // Feedback
        alert('Confirmação enviada com sucesso! O WhatsApp será aberto para enviar a mensagem.');
    });
});
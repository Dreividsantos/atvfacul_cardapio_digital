// Função para adicionar itens ao carrinho

function adicionarItemAoCarrinho(id, nome, preco) {
    const carrinhoBody = document.getElementById('carrinhoBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${nome}</td>
        <td><input type="number" value="1" min="1" onchange="atualizarTotal()"></td>
        <td>R$ ${preco.toFixed(2)}</td>
        <td>R$ ${(preco).toFixed(2)}</td>
        <td><button onclick="removerItem(this)">Remover</button></td>
    `;
    carrinhoBody.appendChild(row);
    atualizarTotal();
}

// Função para remover item do carrinho

function removerItem(button) {
    button.parentElement.parentElement.remove();
    atualizarTotal();
}

// Função para atualizar o total do pedido

function atualizarTotal() {
    const carrinhoBody = document.getElementById('carrinhoBody');
    const rows = carrinhoBody.getElementsByTagName('tr');
    let total = 0;
    for (let i = 0; i < rows.length; i++) {
        const quantidade = rows[i].getElementsByTagName('input')[0].value;
        const preco = rows[i].getElementsByTagName('td')[2].innerText.replace('R$ ', '');
        const totalItem = quantidade * parseFloat(preco);
        rows[i].getElementsByTagName('td')[3].innerText = `R$ ${totalItem.toFixed(2)}`;
        total += totalItem;
    }
    document.getElementById('totalPedido').innerText = total.toFixed(2);
}

// Função para adicionar mais itens

function adicionarMaisItens() {
    alert("Selecione mais itens do cardápio.");
}

// Função para finalizar o pedido

function finalizarPedido() {
    document.querySelector('.finalizacao').style.display = 'block';
    document.querySelector('.carrinho').style.display = 'none';
}

// Função para confirmar o pedido

function confirmarPedido() {
    alert("Pedido confirmado! Obrigado.");

    // Aqui, você pode adicionar código para enviar o pedido para um servidor, etc.
}

// Adicionando interatividade para os checkboxes

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const nome = this.getAttribute('data-name');
        const preco = parseFloat(this.getAttribute('data-price'));
        if (this.checked) {
            adicionarItemAoCarrinho(this.id, nome, preco);
        } else {

            // Se o checkbox for desmarcado, remova o item correspondente

            document.querySelectorAll(`#carrinhoBody tr`).forEach(row => {
                if (row.getElementsByTagName('td')[0].innerText === nome) {
                    row.remove();
                    atualizarTotal();
                }
            });
        }
    });
});

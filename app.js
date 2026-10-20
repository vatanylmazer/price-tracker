const productUrlInput = document.getElementById("productUrl");
const targetPriceInput = document.getElementById("targetPrice");
const trackBtn = document.getElementById("trackBtn");
const productList = document.getElementById("productList");
const activeCountElem = document.getElementById("activeCount");
const discountCountElem = document.getElementById("discountCount");

let trackedProducts = JSON.parse(localStorage.getItem("trackedProducts")) || [];

function updateUI() {
    productList.innerHTML = "";
    
    if (trackedProducts.length === 0) {
        productList.innerHTML = `<li class="empty-state">Henüz takip edilen ürün yok. Yukarıdan ekleyebilirsin!</li>`;
        activeCountElem.textContent = "0";
        discountCountElem.textContent = "0";
        return;
    }

    activeCountElem.textContent = trackedProducts.length;
    let discountFound = 0;

    trackedProducts.forEach((product, index) => {
        if (product.isDiscounted) discountFound++;

        const li = document.createElement("li");
        li.className = "product-item";
        li.innerHTML = `
            <div class="product-info">
                <span>🔗 ${product.url}</span>
                <span class="target">Hedef Fiyat: <strong>${product.targetPrice} TL</strong> ${product.isDiscounted ? '🎉 İNDİRİMDE!' : ''}</span>
            </div>
            <button class="delete-btn" onclick="removeProduct(${index})">Sil</button>
        `;
        productList.appendChild(li);
    });

    discountCountElem.textContent = discountFound;
    localStorage.setItem("trackedProducts", JSON.stringify(trackedProducts));
}

trackBtn.addEventListener("click", () => {
    const url = productUrlInput.value.trim();
    const targetPrice = targetPriceInput.value.trim();

    if (!url || !targetPrice) {
        alert("Lütfen hem ürün linkini hem de hedef fiyatı gir dostum!");
        return;
    }

    // Simüle edilmiş rastgele indirim kontrolü (Backend scraping mantığı simülasyonu)
    const isDiscounted = Math.random() < 0.4; 

    trackedProducts.push({
        url: url,
        targetPrice: targetPrice,
        isDiscounted: isDiscounted
    });

    productUrlInput.value = "";
    targetPriceInput.value = "";
    updateUI();
});

window.removeProduct = function(index) {
    trackedProducts.splice(index, 1);
    updateUI();
}

// Sayfa açıldığında verileri yükle
updateUI();
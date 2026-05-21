// 1. Ürün Listesinden Sepete Ürün Ekleme Fonksiyonu
function sepeteEkle(urunAdi, urunFiyati) {
    let sepet = JSON.parse(localStorage.getItem("sepetim")) || [];
    sepet.push({ ad: urunAdi, price: urunFiyati }); // Basitçe nesne ekliyoruz
    localStorage.setItem("sepetim", JSON.stringify(sepet));
    alert(urunAdi + " sepetinize eklendi!");
}

// 2. Sepet Sayfası Yüklendiğinde Ürünleri Ekrana Basma Fonksiyonu
document.addEventListener("DOMContentLoaded", function () {
    const sepetAlani = document.querySelector(".cart-items");
    const toplamFiyatAlani = document.getElementById("toplam-fiyat");

    if (sepetAlani) {
        let sepet = JSON.parse(localStorage.getItem("sepetim")) || [];
        sepetAlani.innerHTML = ""; 
        let toplamTutar = 0;

        if (sepet.length === 0) {
            sepetAlani.innerHTML = "<p>Sepetiniz şu anda boş.</p>";
            if (toplamFiyatAlani) toplamFiyatAlani.innerText = "0 TL";
            return;
        }

        sepet.forEach((urun, index) => {
            // Fiyatı sayıya çevirip toplama ekliyoruz
            let temizFiyat = Number(urun.price.replace(".", "").replace(" TL", ""));
            toplamTutar += temizFiyat;

            sepetAlani.innerHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                    <strong>${urun.ad}</strong>
                    <span>${urun.price}</span>
                    <button onclick="urunSil(${index})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; cursor:pointer;">Sil</button>
                </div>
            `;
        });

        if (toplamFiyatAlani) {
            toplamFiyatAlani.innerText = toplamTutar.toLocaleString('tr-TR') + " TL";
        }
    }
});

// 3. Sepetten Seçilen Ürünü Silme Fonksiyonu
function urunSil(index) {
    let sepet = JSON.parse(localStorage.getItem("sepetim")) || [];
    sepet.splice(index, 1);
    localStorage.setItem("sepetim", JSON.stringify(sepet));
    alert("Ürün sepetten kaldırıldı!");
    location.reload();
}
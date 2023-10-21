Number.prototype.toDivide = function() {
	var int = String(Math.trunc(this));
	if(int.length <= 3) return int;
	var space = 0;
	var number = '';

	for(var i = int.length - 1; i >= 0; i--) {
		if(space == 3) {
			number = ' ' + number;
			space = 0;
		}
		number = int.charAt(i) + number;
		space++;
	}

	return number;
}

const cart = document.querySelectorAll('.cart-goods__active');
const cartTitle = document.querySelector('.goods-controlPanel');
const totalPriceCount = document.querySelector('.total-title__sum__count');
const totalPriceCountWithoutDicount = document.querySelector('.total-calculations__goods__desc');
const goodsCount = document.querySelector('.total-calculations__goods__text')
const $totalDiscount = document.querySelector('.total-calculations__discount__desc')

function changeTotalCount() {
    const goods = document.querySelectorAll('.counter__value');
    let totalGoods = 0;
    if (goods) {
        goods.forEach((item) => {
            totalGoods = totalGoods + Number(item.innerText)
        })
        
    }
    return totalGoods + ' ' + 'товара';
}
function changeTotalSum() {
    const prices = document.querySelectorAll('.product-price__value__number');
    let totalPrice = 0;
    if (prices) {
        prices.forEach((item) => {
            totalPrice = totalPrice + Number(item.innerText.split(' ').join(''));
        })
    }
    return totalPrice.toDivide();
}
function changeTotalPriceWithoutDiscount() {
    const price = document.querySelectorAll('.product-price__withoutDiscount__value');
    let totalPrice = 0;
    if (price) {
        
        price.forEach((item) => {
            totalPrice = totalPrice + Number(item.innerText.replace('сом', '').split(' ').join(''));
        })
    }
    return totalPrice.toDivide() + ' ' + 'сом';
}

if (cart) {
    cart.forEach((item) => {
        item.addEventListener('click', (e) => {
            const target = e.target;

            const $goodsPrice = target.closest('.product-info')?.querySelector('.product-price').querySelector('.product-price__value').querySelector('.product-price__value__number');
            const $goodsPriceWithout = target.closest('.product-info')?.querySelector('.product-price').querySelector('.product-price__withoutDiscount').querySelector('.product-price__withoutDiscount__value');
            const $value = target.closest('.count__counter')?.querySelector('.counter__value');
            
            
            const remain = target.closest('.product-count')?.querySelector('.count__balance')?.querySelector('.balance__value').innerText;
            const sum = $goodsPrice.innerText.split(' ').join('');
            const sumWithout = $goodsPriceWithout.innerText.split(' ').join('');
            let priceOne;
            let priceWithout;
            console.log(sumWithout)
            if (target.closest('.count__counter')) {
                let value = parseInt($value.innerText);

                    if (sum !== '0') {
                        priceOne = sum / value;
                        priceWithout = sumWithout.replace('сом', '') / value;
                    } else{
                        priceOne = 100;
                        priceWithout = 110;
                    }
                    

                if (target.classList.contains('counter__minus')) {
                    if (target.classList.contains('disabled__button')) return
                    --value;
                } else if (target.classList.contains('counter__plus')) {
                    if (target.classList.contains('disabled__button')) return
                    value++;
                }

                if (value <= 0) {
                    value = 0;
                    target.closest('.count__counter').querySelector('.counter__minus').classList.add('disabled__button');
                } else {
                    target.closest('.count__counter').querySelector('.counter__minus').classList.remove('disabled__button');
                }

                if (value >= remain) {
                    target.closest('.count__counter').querySelector('.counter__plus').classList.add('disabled__button');
                } else {
                    target.closest('.count__counter').querySelector('.counter__plus').classList.remove('disabled__button');
                }

                if ($goodsPrice.innerText.length > 6 && !$goodsPrice.classList.contains('bigPrice')){
                    $goodsPrice.classList.add('bigPrice')
                } else {
                    
                }
                if ($goodsPrice.innerText.length <= 6 && $goodsPrice.classList.contains('bigPrice')) {
                    $goodsPrice.classList.remove('bigPrice')
                }

                $value.innerText = value;
                $goodsPrice.innerText = Math.round((value * priceOne)).toDivide();
                $goodsPriceWithout.innerText = (Math.round(value * Number(priceWithout))).toDivide() + '' + 'сом';
                $totalDiscount.innerText = ((Math.round(value * Number(priceWithout))) - (value * priceOne)).toDivide() + ' ' + 'сом'
                goodsCount.innerText = changeTotalCount();
                totalPriceCount.innerText = changeTotalSum();
                totalPriceCountWithoutDicount.innerText = changeTotalPriceWithoutDiscount();
            } 
        })
    })
    
}


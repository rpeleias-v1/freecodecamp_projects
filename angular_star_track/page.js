(function() {
	var app = angular.module('store', ['store-products']);

	app.controller('StoreController', ['$http', function($http) {		
		var store = this;
		store.products = [];
		
		$http.get('/products.json').success(function(data) {
			store.products = data;
		});
	}]);

	app.controller("PanelController", (function(){
		this.tab = 1;
		this.selectTab = function(setTab) {
			this.tab = setTab;
		}
		this.isSelected = function(checkTab) {
			return this.tab === checkTab;
		}
	});

	app.controller('ReviewController', function() {
		this.review = {};

		this.addReview = function(product) {
			product.reviews.push(this.review);
			this.review = {};
		}
	});

	var gems = [
	{
		name: 'Dodecahedron',
		price: 2.95,
		description: '...',
		canPurchase: true,
		soldOut: true,
		images: [
			{
				full: 'full.jpg',
				thumb: 'thumb.jpg'
			},
			{
				full: 'full.jpg',
				thumb: 'thumb.jpg'
			}
		],
		reviews: [
			{
				stars: 5,
				body: 'I love this product!',
				author: 'a@b.com'
			},
			{
				stars: 5,
				body: 'I love this product!',
				author: 'a@b.com'
			},
		]
	},
	{
		name: 'Pentagonal Gem',
		price: 5.95,
		description: '...',
		canPurchase: false,
		soldOut: true,
		images: [
			{
				full: 'full.jpg',
				thumb: 'thumb.jpg'
			},
			{
				full: 'full.jpg',
				thumb: 'thumb.jpg'
			}
		],
		reviews: [
			{
				stars: 5,
				body: 'I love this product!',
				author: 'a@b.com'
			},
			{
				stars: 5,
				body: 'I love this product!',
				author: 'a@b.com'
			},
		]
	}
	]
})();


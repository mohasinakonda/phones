// global containers
const inputValue = document.getElementById("search-value")
const productsContainer = document.getElementById("products-container")

const ProductsDetailsModal = document.getElementById("products-details")

// search functionality
document.getElementById("search-btn").addEventListener("click", () => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue.value}`

	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			if (data.status === false) {
				productsContainer.innerHTML =
					"<h1 class='text-center'> No products found!!</h1>"
			}
			getPhones(data.data)
		})

	inputValue.value = ""
	productsContainer.innerHTML = ""
})
// get phones
const getPhones = (phones) => {
	// show twentyPhones
	const twentyPhones = phones.slice(0, 20)
	twentyPhones.forEach((phone) => {
		const div = document.createElement("div")

		div.classList.add("card", "col-md-6", "m-2")
		div.style.width = "18rem"
		div.innerHTML = `
			
							<img src="${phone.image}" class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title">${phone.phone_name}</h5>
								<p class="card-text">${phone.brand}</p>
								
							</div>
							<button onclick=getPhoneDetails('${phone.slug}')  class="btn btn-outline-info ">show details</button>
						
			`
		productsContainer.appendChild(div)
	})

	ProductsDetailsModal.textContent = ""
}
// get phones  details
const getPhoneDetails = (id) => {
	const url = `https://openapi.programming-hero.com/api/phone/${id}`
	fetch(url)
		.then((res) => res.json())
		.then((phonesDetails) => getPhonesById(phonesDetails.data))
	ProductsDetailsModal.textContent = ""
}
// get phone by id
const getPhonesById = (phone) => {
	ProductsDetailsModal.innerHTML = ""
	const sensors = phone.mainFeatures.sensors ?? []
	delete phone.mainFeatures.sensors ?? []

	const mainFeatures = phone.mainFeatures
	const otherFeature = phone.others ?? {}

	const releaseDate = phone.releaseDate
		? phone.releaseDate
		: "Release date not available"
	ProductsDetailsModal.innerHTML = `
	<div class=" col-12 ">
					<img class="img-fluid" src="${phone.image}" class="card-img-top" alt="..." />
					<div class="card-body">
						<h5 class="card-title">${phone.name}</h5>
						<p class="card-text">
						${releaseDate}
						</p>
					
						
						
					</div>
	`
	features(mainFeatures, "Main feature :")
	sensorsList(sensors)
	features(otherFeature, "Other feature :")
}
// feature template
const features = (mainFeatures, title) => {
	const div = document.createElement("div")

	const h3 = document.createElement("h3")
	h3.innerHTML = title
	div.appendChild(h3)
	div.classList.add("col-12")
	for (const [key, value] of Object.entries(mainFeatures)) {
		const p = document.createElement("p")

		p.innerHTML = `<span class="fw-bold">${key}</span> &rarr; ${value}`
		div.appendChild(p)

		ProductsDetailsModal.appendChild(div)
	}
}

// showing sensor

const sensorsList = (sensor) => {
	const div = document.createElement("div")
	const h3 = document.createElement("h3")
	h3.innerHTML = "sensors :"
	div.appendChild(h3)
	div.classList.add("col-12")
	for (const value of sensor) {
		const p = document.createElement("p")

		p.innerHTML = ` &rarr; ${value}`
		div.appendChild(p)
		ProductsDetailsModal.appendChild(div)
	}
}

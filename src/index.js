
const quotesUL = document.getElementById('quote-list')


fetch("http://localhost:3000/quotes?_embed=likes")
.then(res => res.json())
.then((quotesArr) => {
    quotesArr.forEach((quote) => {
        let quoteLi = document.createElement('Li')
        quoteLi.className = "quote-card"

        quoteLi.innerHTML = `<blockquote class="blockquote chic ken">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>`

      quotesUL.append(quoteLi)
        
      let likeButton = quoteLi.querySelector('.btn-success')
      likeButton.addEventListener('click', () => {
       // console.log(quoteLi, quote, evt.target)

       fetch(`http://localhost:3000/likes`, {
           method: 'POST',
           headers: {
               "Content-Type": "application/json",
               "accept": "application/json"
           },
           body: JSON.stringify({
               quoteId: quote.id
           })
         }) // end of fetch
         .then(res => res.json())
         .then((likeObj) => {
             //modifying the object in memory
             quote.likes.push(likeObj)
             // manipulating the DOM
             let span = quoteLi.querySelector('span')
             span.innerText = quote.likes.length
         })
    }) // end of addEventLister

    let deleteButton = quoteLi.querySelector(".btn-danger")
    deleteButton.addEventListener('click', () => {
        fetch(`http://localhost:3000/quotes/${quote.id}`, {
            method: "DELETE"
        }) //end of delete fetch
        .then(res => res.json())
        .then(() => {
            quoteLi.remove()
        })
    })

        

    })//end of .forEach

}) //end of second .then
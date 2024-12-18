<template>
    <div class="section">
        <h2>Notre équipe</h2>
        <ul>
            <li>
                <img src="@/assets/img/correntin.png" alt="">
                <h3>Corentin <span>Nelhomme</span></h3>
            </li>
            <li>
                <img src="@/assets/img/richard.png" alt="">
                <h3>Richard <span>Quin</span></h3>
            </li>
            <li>
                <img src="@/assets/img/axel.png" alt="">
                <h3>Axel <span>Tribondeau</span></h3>
            </li>
            <li>
                <img src="@/assets/img/emilien.png" alt="">
                <h3>Emilien <span>Rozier</span></h3>
            </li>
        </ul>
    </div>
</template>

<style scoped>

.section {
    padding-bottom: 75px;
}

h2 {
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 40px;
    color: var(--text-color);
}

h3 {
    margin-top: 20px;
    color: var(--text-color);
}

h3,span {
    font-weight: bold;
    font-size: 20px;
}

ul {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
}

li:nth-child(2),
li:nth-child(3) {
    margin: 0 12.5px;
}

li {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.3s;
}

li:hover {
    scale: 1.01;
}

img {
    width: 100%;
}

span {
    text-transform: uppercase;
}

@media only screen and (max-width: 768px) {
    .section {
        padding-bottom: 50px; /* Adjust padding for smaller screens */
    }

    h2 {
        font-size: 28px; /* Scale down the title size */
        margin-bottom: 20px; /* Adjust margin for spacing */
    }

    ul {
        flex-direction: row; /* Arrange items horizontally */
        flex-wrap: wrap; /* Allow items to wrap to the next line if needed */
        justify-content: center; /* Center items horizontally */
        gap: 15px; /* Add spacing between items */
        margin: 0; /* Remove side margins */
    }

    li {
        margin: 0; /* Remove horizontal margins */
        width: 45%; /* Reduce size of each list item */
        display: flex; /* Ensure horizontal alignment */
        align-items: center;
        gap: 10px; /* Add spacing between image and text */
    }

    img {
        width: 60px; /* Smaller image size */
        height: 60px; /* Maintain square aspect ratio */
        border-radius: 50%; /* Make images circular */
    }

    h3 {
        font-size: 16px; /* Reduce font size */
    }

    span {
        font-size: 14px; /* Scale down the text inside <span> */
    }
}

</style>
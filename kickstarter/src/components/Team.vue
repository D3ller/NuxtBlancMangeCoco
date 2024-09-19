<template>
    <div>
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
* {
    padding: 0;
}

div {
    max-width: 1113px;
    margin: 0 auto;
}

h2 {
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 30px;
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
    width: 100%;
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
</style>
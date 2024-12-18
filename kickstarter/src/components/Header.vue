<template>
    <header>
        <div class="header_content-wrapper">
            <h1>Banana Split</h1>
            <h3>Jeu de carte multi-joueurs en ligne</h3>
            <div class="header-location">
                <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 17C12.9582 17 14.3567 16.4208 15.3881 15.3897C16.4195 14.3585 16.9993 12.96 17 11.5014C17 10.0423 16.4205 8.64302 15.3891 7.61132C14.3576 6.57961 12.9587 6 11.5 6C10.0413 6 8.64236 6.57961 7.61091 7.61132C6.57946 8.64302 6 10.0423 6 11.5014C6.00073 12.96 6.58051 14.3585 7.61188 15.3897C8.64326 16.4208 10.0418 17 11.5 17Z" stroke="#C9C9C9" stroke-width="1.5" stroke-linecap="square"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8996 11.3931C21.8996 20.0545 13.2329 25.2511 11.4996 25.2511C9.76627 25.2511 1.09961 20.0545 1.09961 11.3931C1.10145 8.63602 2.19797 5.99252 4.14815 4.04364C6.09833 2.09476 8.74256 0.999999 11.4996 1C17.2421 1 21.8996 5.654 21.8996 11.3931Z" stroke="#C9C9C9" stroke-width="1.5" stroke-linecap="square"/>
                </svg>
                <p>Troyes</p>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    background: linear-gradient(to bottom, transparent, #141414ed), url("@/assets/img/cartes-mockup.png");
    background-size: 100%;
    background-repeat: no-repeat;
    height: 60vw;
    max-height: 70vh;
    position: relative;
    color: white;
  margin-bottom: 60px;
}

.header_content-wrapper {
    position: absolute;
    bottom: 0;
    margin: 0 75px;
    padding-bottom: 50px;
}

.header-location {
    margin-top: 15px;
    display: flex;
    color: var(--gray-color);
}

.header-location > p {
    margin-left: 5px;
}

h1 {
    font-weight: bold;
    font-size: 96px;
}

h3 {
    font-size: 32px;
    color: var(--gray-color);
}

@media only screen and (max-width: 768px) {
    header {
        background-size: cover; /* Ensure the image covers the header fully */
        height: 50vh; /* Adjust height for smaller screens */
        margin-bottom: 40px;
        width: 100%;
    }

    .header_content-wrapper {
        position: absolute;
        bottom: 0;
        margin: 0 20px; /* Reduce margins for smaller screens */
        padding-bottom: 20px; /* Adjust padding */
    }

    h1 {
        font-size: 36px; /* Reduce the title size */
        line-height: 1.2;
    }

    h3 {
        font-size: 18px; /* Adjust subtitle size */
    }

    .header-location {
        margin-top: 10px;
        font-size: 14px; /* Adjust text size for smaller screens */
    }

    .header-location > p {
        margin-left: 3px;
    }

    svg {
        width: 18px; /* Scale down SVG size */
        height: 20px;
    }
}

</style>
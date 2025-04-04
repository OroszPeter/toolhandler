<script>
    import { page } from '$app/stores';
    import { afterNavigate } from '$app/navigation';
    import { goto } from '$app/navigation'; // Importáljuk a goto-t a navigációhoz
    import { writable } from 'svelte/store';
  
    let searchQuery = writable(''); // Kezdetben üres keresési kifejezés
  
    // Menü lista
    let { children, data } = $props();
    let user = $state(data.user);
    let path = $state($page.url.pathname);
  
    // Menüelem lista
    let menu = $derived([
      { felirat: "Kezdőoldal", link: "/" },
      { felirat: "Eszközök", link: "/tools" },
      { felirat: "Saját eszközök", link: "/my-tools" },
      { felirat: "Eszköz hozzáadása", link: "/add-tools" },
      { felirat: "Statisztika", link: "/statistic" },
      { felirat: user?.id ? "Kijelentkezés" : "Bejelentkezés / Regisztráció", link: "/demo/lucia" }
    ]);
  
    // A navigációhoz szükséges állapot frissítése
    afterNavigate(() => {
      path = $page.url.pathname;
      user = data.user;
    });
  
    // Keresési esemény kezelése
    function handleSearch(event) {
        // Ha az esemény egy billentyűleütés és nem Enter, akkor ne csináljon semmit
        if (event.type === 'keydown' && event.key !== 'Enter') {
            return;
        }
        
        // Ha az esemény egy input esemény, akkor ne csináljon semmit
        if (event.type === 'input') {
            return;
        }

        // Megakadályozzuk az alapértelmezett form submit eseményt
        event.preventDefault();

        const query = $searchQuery;
        
        // Navigálunk a keresési oldalra a megfelelő paraméterrel
        if (query.trim() === '') {
            goto('/result');
        } else {
            goto(`/result?search=${query}`);
        }
    }
  </script>
  
  <div class="ui black inverted pointing menu">
    <!-- Menüelemek dinamikusan generálva -->
    {#each menu as item}
      <a 
        class="item {item.link === path || item.link + '/login' === path ? 'active' : ''}" 
        href={item.link}>
        {item.felirat}
      </a>
    {/each}
  
    <div class="right menu">
      <div class="item">
        <form class="ui white icon input" on:submit|preventDefault={handleSearch}>
          <input 
            type="text" 
            placeholder="Search..." 
            bind:value={$searchQuery}
            on:keydown={handleSearch} />
          <i class="search link icon" on:click={handleSearch}></i>
        </form>
      </div>
    </div>
  </div>
  
  <!-- A layout tartalmának renderelése -->
  {@render children()}
  
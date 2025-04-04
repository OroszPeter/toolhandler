<script>
    import { onMount } from 'svelte';
  
    let tools = [];
    let editTool = null;
  
    // Lekérdezi az aktuális felhasználó eszközeit
    async function fetchTools() {
        const res = await fetch('/my-tools');
        const data = await res.json();
        tools = data.tools;
    }
  
    onMount(fetchTools);
  
    // Eszköz törlése
    async function deleteTool(toolId) {
        const res = await fetch('/my-tools', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: toolId })
        });
  
        if (res.ok) {
            await fetchTools();
        } else {
            alert('Hiba történt a törlés során.');
        }
    }
    // !!!!!ADATBÁZIS SZERKESZTÉSE KELL!!!!
    // // Eszköz visszaadása (user_id nullázása)
    // async function returnTool(toolId) {
    //     const res = await fetch('/my-tools', {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ id: toolId, return: true }) // Jelezzük, hogy visszaadásról van szó
    //     });
  
    //     if (res.ok) {
    //         await fetchTools();
    //     } else {
    //         alert('Hiba történt a visszaadás során.');
    //     }
    // }
  
    // Szerkesztés kezdeményezése
    function startEdit(tool) {
        editTool = { ...tool };
    }
  
    // Szerkesztett adatok mentése
    async function saveEdit() {
        const res = await fetch('/my-tools', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editTool)
        });
  
        if (res.ok) {
            editTool = null;
            await fetchTools();
        } else {
            alert('Hiba történt a mentés során.');
        }
    }
  </script>
  
  <main>
    <h1>Eszközeim</h1>
    <table class="ui fixed table">
        <thead>
            <tr>
                <th>Eszköz neve</th>
                <th>Leírás</th>
                <th>Események</th>
            </tr>
        </thead>
        <tbody>
            {#each tools as tool}
            <tr>
                <td>{tool.title}</td>
                <td>{tool.description}</td>
                <td>
                    <button class="ui blue button" on:click={() => startEdit(tool)}>Szerkesztés</button>
                    <button class="ui red button" on:click={() => deleteTool(tool.id)}>Törlés</button>
                    <!-- <button class="ui yellow button" on:click={() => returnTool(tool.id)}>Visszaadás</button> -->
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
  
    {#if editTool}
    <div class="edit-modal">
        <h2>Eszköz szerkesztése</h2>
        <div class="field">
            <label class="ui label">Eszköz neve</label>
            <input type="text" bind:value={editTool.title} name="title" required />
        </div>
        <div class="field">
            <label class="ui label">Leírás</label>
            <textarea bind:value={editTool.description} name="description" required></textarea>
        </div>
        <button on:click={saveEdit} class="ui green button">Mentés</button>
        <button on:click={() => (editTool = null)} class="ui red button">Mégse</button>
    </div>
    {/if}
  </main>
  
  <style>
    .edit-modal {
    width: 600px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.field {
    width: 100%;
    margin-bottom: 15px; /* Kis távolság az elemek között */
}

label {
    display: inline-block;
    width: 100%; /* A label szélessége */
    margin-bottom: 5px; /* Kis távolság a label és az input között */
}

input, textarea {
    width: 100%; /* Teljes szélesség */
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

textarea {
    height: 150px; /* Megnövelt magasság a textarea számára */
    resize: vertical; /* Csak függőlegesen lehessen méretezni */
}

  </style>
  
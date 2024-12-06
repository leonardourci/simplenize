<script lang="ts">
    let selectedItems: string[] = []; // Array para armazenar itens selecionados
    const options = [
        'Maçã',
        'Banana',
        'Laranja',
        'Uva',
        'Manga',
        'Abacaxi',
        'Cereja'
    ]; // Opções disponíveis

    function toggleSelection(item: string) {
        // Adiciona ou remove o item selecionado
        if (selectedItems.includes(item)) {
            selectedItems = selectedItems.filter((selected) => selected !== item);
        } else {
            selectedItems = [...selectedItems, item];
        }
    }
</script>

<style>
    .option {
        cursor: pointer;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        background-color: #f9f9f9;
        margin: 0.25rem;
        display: inline-block;
        text-align: center;
        transition: background-color 0.2s, color 0.2s;
    }
    .option.selected {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
    }
    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    .tag {
        background-color: #007bff;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
    }
    .tag button {
        margin-left: 0.5rem;
        background: transparent;
        border: none;
        color: white;
        font-size: 0.875rem;
        cursor: pointer;
    }
    .tag button:hover {
        color: #ff4d4f;
    }
</style>

<div class="max-w-2xl mx-auto p-4">
    <h2 class="block text-sm font-medium text-gray-700 mb-2">
        Clique para selecionar frutas:
    </h2>

    <div class="flex flex-wrap">
        {#each options as option}
            <div
                    class="option {selectedItems.includes(option) ? 'selected' : ''}"
                    on:click={() => toggleSelection(option)}
            >
                {option}
            </div>
        {/each}
    </div>

    {#if selectedItems.length > 0}
        <div class="tags">
            {#each selectedItems as item}
                <div class="tag">
                    {item}
                    <button on:click={() => toggleSelection(item)} title="Remover {item}">✖</button>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-gray-500 mt-2">Nenhuma fruta selecionada.</p>
    {/if}
</div>

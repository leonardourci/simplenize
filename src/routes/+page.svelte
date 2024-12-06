<script lang="ts">
    const transformationOptions = ['MAIÚSCULAS', 'MINÚSCULAS', 'Parágrafos para uma linha', 'Primeiras Em Maiúsculas'];

    let input = '';
    let output = '';
    let copySuccess = false;
    let selectedTransformations: string[] = [];

    function toggleTransformation(transformation: string) {
        if (selectedTransformations.includes(transformation)) {
            selectedTransformations = selectedTransformations.filter((t) => t !== transformation);
        } else {
            selectedTransformations = [...selectedTransformations, transformation];
        }
    }

    $: {
        output = input;
        if (selectedTransformations.includes('Parágrafos para uma linha')) {
            output = output.replace(/\s+|\n/g, ' ').trim();
        }
        if (selectedTransformations.includes('MAIÚSCULAS')) {
            output = output.toUpperCase();
        }
        if (selectedTransformations.includes('Primeira Em Maiúsculas')) {
            const result: string[] = []
            const textWords = input
                // Split " "
                .split(' ')
            for (const word of textWords) {
                if (word.length) {
                    const capitalizedWord = word.slice(1, word.length)

                    result.push(word[0].toUpperCase() + capitalizedWord)
                }
            }

            const finalResult = []

            const multipleLinesSplit = result.join(' ').split('\n');

            for (const word of multipleLinesSplit) {
                if (word.length) {
                    const capitalizedWord = word.slice(1, word.length)
                    const lastCharacter = selectedTransformations.includes('Parágrafos para uma linha') ? ' ' : '\n'
                    finalResult.push(word[0].toUpperCase() + capitalizedWord + lastCharacter)
                }
            }

            output = finalResult.join('')
        }
        if (selectedTransformations.includes('MINÚSCULAS')) {
            output = output.toLowerCase();
        }
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(output).then(() => {
            copySuccess = true;
            setTimeout(() => {
                copySuccess = false;
            }, 2500);
        }).catch((err) => {
            console.error('Falha ao copiar texto: ', err);
        });
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
</style>

<div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
    <header class="w-full h-20 flex items-center justify-center bg-white shadow-md">
        <div>
            <img class="mx-auto" width="220" src="/simplenize-logo.png" alt="simplenize"/>
        </div>
    </header>

    <main class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-lg shadow-xl overflow-hidden">
                <div class="p-6 sm:p-10 space-y-6">
                    <div>
                        <label for="multiline" class="block text-lg font-medium text-gray-700 mb-2">
                            Texto para transformar:
                        </label>
                        <textarea
                                id="multiline"
                                bind:value={input}
                                rows="5"
                                class="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                placeholder="Escreva seu texto em parágrafos aqui..."
                        ></textarea>
                    </div>

                    <div>
                        <h2 class="block text-lg font-medium text-gray-700 mb-2">
                            Clique para selecionar transformações:
                        </h2>
                        <div class="flex flex-wrap">
                            {#each transformationOptions as option}
                                <button
                                        class="option {selectedTransformations.includes(option) ? 'selected' : ''}"
                                        on:click={() => toggleTransformation(option)}
                                >
                                    {option}
                                </button>
                            {/each}
                        </div>
                    </div>
                    <div>
                        <label for="singleline" class="block text-lg font-medium text-gray-700 mb-2">
                            Resultado:
                        </label>
                        <div class="flex">
              <textarea
                      readonly
                      class="flex-grow p-3 border border-gray-300 rounded-l-md bg-gray-100"
              >{output}</textarea>
                            <button
                                    aria-label="Copiar para área de transferência"
                                    on:click={copyToClipboard}
                                    class="max-h-25 flex items-center justify-center px-6 border border-l-0 border-gray-300 rounded-r-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 8 8">
                                    <path fill="currentColor"
                                          d="M3.5 0c-.28 0-.5.22-.5.5V1h-.75c-.14 0-.25.11-.25.25V2h3v-.75C5 1.11 4.89 1 4.75 1H4V.5c0-.28-.22-.5-.5-.5M.25 1C.11 1 0 1.11 0 1.25v6.5c0 .14.11.25.25.25h6.5c.14 0 .25-.11.25-.25v-6.5C7 1.11 6.89 1 6.75 1H6v2H1V1z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {#if copySuccess}
                        <p class="text-green-600 text-sm text-center" role="alert">Texto copiado!</p>
                    {/if}
                </div>
            </div>
        </div>
    </main>
</div>

<script context="module" lang="ts">
    let SelectedValue: any = null;
</script>

<script lang="ts">
    type MenuItem = {
        elemName: string;
        elemValue: object;
        index: number;
    };

    type Input = {
        source?: any[];
        OnTextChange: (text: string, selected: boolean) => void;
    };

    let { source = [], OnTextChange }: Input = $props();

    let inputText = $state("");
    let inputSelected = $state(false);
    let inputFocusCount = $state(0);
    let menuItems: MenuItem[] = $derived(getMenuItems());

    function getMenuItems() {
        let rst = [];
        for (let index = 0; index < source.length; index++) {
            const element = source[index];
            rst.push({
                elemName: element.toString(),
                elemValue: element,
                index: index,
            });
        }
        return rst;
    }

    function showList(): Boolean {
        return inputFocusCount > 0;
    }

    function onInput() {
        SelectedValue = null;
        if (OnTextChange) {
            OnTextChange(inputText, false);
        }
    }

    function onInputFocusIn() {
        if (OnTextChange) {
            OnTextChange(inputText, false);
        }
        inputFocusCount++;
    }

    function onItemSelected(item: MenuItem) {
        inputText = item.elemName;
        SelectedValue = item.elemValue;
        if (OnTextChange) {
            OnTextChange(inputText, true);
        }
        inputFocusCount = 0;
    }
</script>

<div class="block">
    <input
        onfocusout={() => inputFocusCount--}
        onfocusin={() => onInputFocusIn()}
        oninput={onInput}
        class="outline-none
    pl-2 pr-2 text-sm w-full
    bg-background border-border
    border-b"
        bind:value={inputText}
        type="text"
    />
    <div class="relative">
        {#if showList()}
            <menu
                class="absolute grid grid-flow-row top-0 left-0 w-full bg-inherit"
            >
                {#each menuItems as item, index}
                    <button
                        onmouseleave={() => inputFocusCount--}
                        onmouseenter={() => inputFocusCount++}
                        onclick={() => onItemSelected(item)}
                        class="w-full block text-center select-none
                  border-t-0 border-border
                 bg-background hover:brightness-95 hover:active:bg-primary
                 cursor-pointer"
                    >
                        {item.elemName}
                    </button>
                {/each}
            </menu>
        {/if}
    </div>
</div>

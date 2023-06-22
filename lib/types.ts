export type SelectedOptionType = {
    name: string;
    description: string;
    path: string;
    selected: boolean;
    price: string;
    reference: string;
    category: string;
}

export type OptionsMenuProps = {
    options: SelectedOptionType[];
    setOptions: (options: SelectedOptionType[]) => void;
    visibleMenu: boolean;
    setVisibleMenu: (visible: boolean) => void;
}

export type PriceType = {
    price: string;
}

export type VulnerableAPI = {
    name: string;
    description: string;
    poc: string;
    codeLanguage: string;
}

export type SafeAPI = {
    name: string;
}

export type ResultsType = {
    vulnerable: VulnerableAPI[];
    safe: SafeAPI[];
}

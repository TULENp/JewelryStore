import { useState } from 'react';
import styles from './BrandSelector.module.css';

interface BrandSelectorProps {
    brands: string[];
    onSelect: (value: string | null) => void;
}

//* Display list of selectable brands
export function BrandSelector({ brands, onSelect }: BrandSelectorProps) {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    const handleBrandSelection = (brand: string) => {
        setSelectedBrand(brand === selectedBrand ? null : brand);
        onSelect(brand === selectedBrand ? null : brand);
    };

    return (
        <section className={styles.container}>
            {brands.map((brand) => (
                <div
                    key={brand}
                    className={
                        brand === selectedBrand
                            ? styles.brandItemSelected
                            : styles.brandItem
                    }
                    onClick={() => handleBrandSelection(brand)}
                >
                    {brand}
                </div>
            ))}
        </section>
    );
}

# Estándar de Código Enterprise - Astro + Solid

## 1. Estructura de Proyecto (Arquitectura en Capas)

```
project-root/
├── src/
│   ├── core/                          # Núcleo del negocio
│   │   ├── domain/                    # Entidades y lógica de dominio
│   │   │   ├── entities/
│   │   │   │   ├── Product.ts
│   │   │   │   ├── User.ts
│   │   │   │   └── Order.ts
│   │   │   ├── value-objects/
│   │   │   │   ├── Money.ts
│   │   │   │   ├── Email.ts
│   │   │   │   └── ProductId.ts
│   │   │   └── repositories/         # Interfaces (ports)
│   │   │       ├── IProductRepository.ts
│   │   │       └── IOrderRepository.ts
│   │   │
│   │   ├── application/               # Casos de uso
│   │   │   ├── use-cases/
│   │   │   │   ├── products/
│   │   │   │   │   ├── GetProduct.ts
│   │   │   │   │   ├── CreateProduct.ts
│   │   │   │   │   └── UpdateProduct.ts
│   │   │   │   ├── orders/
│   │   │   │   └── auth/
│   │   │   ├── services/
│   │   │   │   ├── PaymentService.ts
│   │   │   │   └── EmailService.ts
│   │   │   └── dto/
│   │   │       ├── ProductDTO.ts
│   │   │       └── OrderDTO.ts
│   │   │
│   │   └── infrastructure/            # Implementaciones
│   │       ├── repositories/
│   │       │   ├── SupabaseProductRepository.ts
│   │       │   └── PrismaOrderRepository.ts
│   │       ├── http/
│   │       │   └── ApiClient.ts
│   │       └── cache/
│   │           └── RedisCache.ts
│   │
│   ├── ui/                            # Capa de presentación
│   │   ├── components/
│   │   │   ├── atoms/                 # Componentes atómicos
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.styles.ts
│   │   │   │   │   ├── Button.test.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Input/
│   │   │   │   ├── Badge/
│   │   │   │   └── Icon/
│   │   │   │
│   │   │   ├── molecules/             # Componentes compuestos
│   │   │   │   ├── SearchBar/
│   │   │   │   ├── ProductCard/
│   │   │   │   └── FormField/
│   │   │   │
│   │   │   ├── organisms/             # Componentes complejos
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   ├── ProductGrid/
│   │   │   │   └── CheckoutForm/
│   │   │   │
│   │   │   ├── templates/             # Layouts de página
│   │   │   │   ├── MainLayout/
│   │   │   │   ├── DashboardLayout/
│   │   │   │   └── CheckoutLayout/
│   │   │   │
│   │   │   └── features/              # Módulos de funcionalidad
│   │   │       ├── products/
│   │   │       │   ├── ProductList/
│   │   │       │   ├── ProductDetail/
│   │   │       │   └── ProductFilters/
│   │   │       ├── cart/
│   │   │       └── auth/
│   │   │
│   │   ├── stores/                    # Estado global (Solid Stores)
│   │   │   ├── cart.store.ts
│   │   │   ├── user.store.ts
│   │   │   └── ui.store.ts
│   │   │
│   │   ├── hooks/                     # Custom hooks/composables
│   │   │   ├── useCart.ts
│   │   │   ├── useAuth.ts
│   │   │   └── useMediaQuery.ts
│   │   │
│   │   └── styles/                    # Sistema de diseño
│   │       ├── tokens/
│   │       │   ├── colors.ts
│   │       │   ├── typography.ts
│   │       │   ├── spacing.ts
│   │       │   └── breakpoints.ts
│   │       ├── themes/
│   │       │   ├── light.ts
│   │       │   └── dark.ts
│   │       ├── utilities/
│   │       │   ├── mixins.ts
│   │       │   └── helpers.ts
│   │       └── global.css
│   │
│   ├── shared/                        # Código compartido
│   │   ├── types/
│   │   │   ├── api.types.ts
│   │   │   └── common.types.ts
│   │   ├── utils/
│   │   │   ├── formatters/
│   │   │   │   ├── currency.ts
│   │   │   │   └── date.ts
│   │   │   ├── validators/
│   │   │   │   └── schemas.ts
│   │   │   └── helpers/
│   │   │       └── array.ts
│   │   ├── constants/
│   │   │   ├── routes.ts
│   │   │   └── api.ts
│   │   └── config/
│   │       ├── env.ts
│   │       └── features.ts
│   │
│   ├── pages/                         # Páginas de Astro
│   │   ├── index.astro
│   │   ├── products/
│   │   │   ├── [id].astro
│   │   │   └── index.astro
│   │   ├── cart.astro
│   │   └── api/                       # API endpoints
│   │       ├── products/
│   │       └── orders/
│   │
│   ├── layouts/                       # Layouts de Astro
│   │   ├── BaseLayout.astro
│   │   └── ProductLayout.astro
│   │
│   └── middleware/                    # Middleware de Astro
│       ├── auth.ts
│       └── analytics.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/
│   ├── architecture/
│   ├── components/
│   └── api/
│
└── config files...
```

---

## 2. Principios de Diseño de Componentes

### 2.1 Atomic Design System

```typescript
// src/ui/components/atoms/Button/Button.tsx
import { Component, JSX, splitProps } from 'solid-js'
import { buttonStyles, type ButtonVariant, type ButtonSize } from './Button.styles'

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  fullWidth?: boolean
}

/**
 * Button component - Componente atómico base
 * 
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export const Button: Component<ButtonProps> = (props) => {
  const [local, attrs] = splitProps(props, [
    'variant',
    'size',
    'isLoading',
    'leftIcon',
    'rightIcon',
    'fullWidth',
    'children',
    'disabled'
  ])

  const isDisabled = () => local.disabled || local.isLoading

  return (
    <button
      {...attrs}
      class={buttonStyles({
        variant: local.variant ?? 'primary',
        size: local.size ?? 'md',
        fullWidth: local.fullWidth,
        isLoading: local.isLoading
      })}
      disabled={isDisabled()}
      aria-busy={local.isLoading}
    >
      {local.leftIcon && <span class="button-icon-left">{local.leftIcon}</span>}
      {local.isLoading ? <Spinner size={local.size} /> : local.children}
      {local.rightIcon && <span class="button-icon-right">{local.rightIcon}</span>}
    </button>
  )
}
```

### 2.2 Sistema de Estilos (CSS-in-JS con Vanilla Extract)

```typescript
// src/ui/components/atoms/Button/Button.styles.ts
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { tokens } from '@/ui/styles/tokens'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const baseButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.spacing[2],
  fontFamily: tokens.typography.fontFamily.sans,
  fontWeight: tokens.typography.fontWeight.semibold,
  borderRadius: tokens.borderRadius.md,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  outline: 'none',
  
  ':focus-visible': {
    boxShadow: `0 0 0 3px ${tokens.colors.focus}`,
  },
  
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
})

export const buttonStyles = recipe({
  base: baseButton,
  
  variants: {
    variant: {
      primary: {
        backgroundColor: tokens.colors.primary[600],
        color: tokens.colors.white,
        ':hover:not(:disabled)': {
          backgroundColor: tokens.colors.primary[700],
          transform: 'translateY(-1px)',
          boxShadow: tokens.shadows.md,
        },
        ':active:not(:disabled)': {
          transform: 'translateY(0)',
        },
      },
      secondary: {
        backgroundColor: tokens.colors.gray[200],
        color: tokens.colors.gray[900],
        ':hover:not(:disabled)': {
          backgroundColor: tokens.colors.gray[300],
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: tokens.colors.primary[600],
        ':hover:not(:disabled)': {
          backgroundColor: tokens.colors.primary[50],
        },
      },
      danger: {
        backgroundColor: tokens.colors.error[600],
        color: tokens.colors.white,
        ':hover:not(:disabled)': {
          backgroundColor: tokens.colors.error[700],
        },
      },
    },
    
    size: {
      sm: {
        height: '32px',
        padding: `0 ${tokens.spacing[3]}`,
        fontSize: tokens.typography.fontSize.sm,
      },
      md: {
        height: '40px',
        padding: `0 ${tokens.spacing[4]}`,
        fontSize: tokens.typography.fontSize.base,
      },
      lg: {
        height: '48px',
        padding: `0 ${tokens.spacing[6]}`,
        fontSize: tokens.typography.fontSize.lg,
      },
    },
    
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    
    isLoading: {
      true: {
        pointerEvents: 'none',
      },
    },
  },
  
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
```

### 2.3 Design Tokens

```typescript
// src/ui/styles/tokens/colors.ts
export const colors = {
  // Escala de colores primarios
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Escala de grises semántica
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Colores semánticos
  success: {
    50: '#f0fdf4',
    600: '#16a34a',
    700: '#15803d',
  },
  
  error: {
    50: '#fef2f2',
    600: '#dc2626',
    700: '#b91c1c',
  },
  
  warning: {
    50: '#fffbeb',
    600: '#d97706',
    700: '#b45309',
  },
  
  info: {
    50: '#eff6ff',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  
  // Colores base
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  
  // Color de foco
  focus: 'rgba(59, 130, 246, 0.5)',
} as const

// src/ui/styles/tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const

// src/ui/styles/tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const

// src/ui/styles/tokens/index.ts
export const tokens = {
  colors,
  spacing,
  typography,
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    dropdown: 1000,
    modal: 1100,
    popover: 1200,
    tooltip: 1300,
  },
} as const
```

---

## 3. Arquitectura Hexagonal (Ports & Adapters)

### 3.1 Dominio (Core Business Logic)

```typescript
// src/core/domain/entities/Product.ts
import { ProductId } from '../value-objects/ProductId'
import { Money } from '../value-objects/Money'

export interface ProductProps {
  id: ProductId
  name: string
  description: string
  price: Money
  stock: number
  images: string[]
  category: string
  createdAt: Date
  updatedAt: Date
}

export class Product {
  private constructor(private readonly props: ProductProps) {}

  static create(props: Omit<ProductProps, 'id' | 'createdAt' | 'updatedAt'>): Product {
    return new Product({
      ...props,
      id: ProductId.generate(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  static fromPrimitives(data: ProductProps): Product {
    return new Product(data)
  }

  // Getters
  get id(): ProductId {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get price(): Money {
    return this.props.price
  }

  get isInStock(): boolean {
    return this.props.stock > 0
  }

  // Métodos de negocio
  decreaseStock(quantity: number): void {
    if (quantity > this.props.stock) {
      throw new Error('Insufficient stock')
    }
    this.props.stock -= quantity
    this.props.updatedAt = new Date()
  }

  updatePrice(newPrice: Money): void {
    this.props.price = newPrice
    this.props.updatedAt = new Date()
  }

  toPrimitives(): ProductProps {
    return { ...this.props }
  }
}

// src/core/domain/value-objects/Money.ts
export class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: string
  ) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative')
    }
  }

  static create(amount: number, currency: string = 'USD'): Money {
    return new Money(amount, currency)
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies')
    }
    return new Money(this.amount + other.amount, this.currency)
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency)
  }

  format(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency,
    }).format(this.amount)
  }
}
```

### 3.2 Casos de Uso (Application Layer)

```typescript
// src/core/application/use-cases/products/GetProduct.ts
import type { IProductRepository } from '@/core/domain/repositories/IProductRepository'
import type { Product } from '@/core/domain/entities/Product'
import { ProductId } from '@/core/domain/value-objects/ProductId'

export interface GetProductDTO {
  id: string
}

export class GetProduct {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(dto: GetProductDTO): Promise<Product | null> {
    const productId = ProductId.fromString(dto.id)
    return await this.productRepository.findById(productId)
  }
}

// src/core/application/use-cases/products/CreateProduct.ts
import type { IProductRepository } from '@/core/domain/repositories/IProductRepository'
import { Product } from '@/core/domain/entities/Product'
import { Money } from '@/core/domain/value-objects/Money'

export interface CreateProductDTO {
  name: string
  description: string
  price: number
  stock: number
  images: string[]
  category: string
}

export class CreateProduct {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(dto: CreateProductDTO): Promise<Product> {
    const product = Product.create({
      name: dto.name,
      description: dto.description,
      price: Money.create(dto.price),
      stock: dto.stock,
      images: dto.images,
      category: dto.category,
    })

    return await this.productRepository.save(product)
  }
}
```

### 3.3 Repository Pattern

```typescript
// src/core/domain/repositories/IProductRepository.ts
import type { Product } from '../entities/Product'
import type { ProductId } from '../value-objects/ProductId'

export interface IProductRepository {
  findById(id: ProductId): Promise<Product | null>
  findAll(filters?: ProductFilters): Promise<Product[]>
  save(product: Product): Promise<Product>
  update(product: Product): Promise<Product>
  delete(id: ProductId): Promise<void>
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  search?: string
}

// src/core/infrastructure/repositories/SupabaseProductRepository.ts
import type { IProductRepository, ProductFilters } from '@/core/domain/repositories/IProductRepository'
import type { Product } from '@/core/domain/entities/Product'
import { ProductId } from '@/core/domain/value-objects/ProductId'
import { supabase } from '@/shared/config/supabase'

export class SupabaseProductRepository implements IProductRepository {
  async findById(id: ProductId): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id.value)
      .single()

    if (error || !data) return null

    return Product.fromPrimitives(this.mapToEntity(data))
  }

  async findAll(filters?: ProductFilters): Promise<Product[]> {
    let query = supabase.from('products').select('*')

    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    if (filters?.minPrice) {
      query = query.gte('price', filters.minPrice)
    }

    if (filters?.maxPrice) {
      query = query.lte('price', filters.maxPrice)
    }

    if (filters?.inStock) {
      query = query.gt('stock', 0)
    }

    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`)
    }

    const { data, error } = await query

    if (error || !data) return []

    return data.map(item => Product.fromPrimitives(this.mapToEntity(item)))
  }

  async save(product: Product): Promise<Product> {
    const data = this.mapToDatabase(product)
    const { data: saved, error } = await supabase
      .from('products')
      .insert(data)
      .select()
      .single()

    if (error) throw new Error(`Failed to save product: ${error.message}`)

    return Product.fromPrimitives(this.mapToEntity(saved))
  }

  async update(product: Product): Promise<Product> {
    const data = this.mapToDatabase(product)
    const { data: updated, error } = await supabase
      .from('products')
      .update(data)
      .eq('id', product.id.value)
      .select()
      .single()

    if (error) throw new Error(`Failed to update product: ${error.message}`)

    return Product.fromPrimitives(this.mapToEntity(updated))
  }

  async delete(id: ProductId): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id.value)

    if (error) throw new Error(`Failed to delete product: ${error.message}`)
  }

  private mapToEntity(data: any): any {
    return {
      id: ProductId.fromString(data.id),
      name: data.name,
      description: data.description,
      price: Money.create(data.price),
      stock: data.stock,
      images: data.images,
      category: data.category,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    }
  }

  private mapToDatabase(product: Product): any {
    const props = product.toPrimitives()
    return {
      id: props.id.value,
      name: props.name,
      description: props.description,
      price: props.price.amount,
      stock: props.stock,
      images: props.images,
      category: props.category,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    }
  }
}
```

---

## 4. Gestión de Estado con Solid Stores

```typescript
// src/ui/stores/cart.store.ts
import { createStore } from 'solid-js/store'
import type { Product } from '@/core/domain/entities/Product'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
}

const [cart, setCart] = createStore<CartStore>({
  items: [],
  isOpen: false,
})

// Selectores computados
export const cartSelectors = {
  get itemCount() {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0)
  },
  
  get total() {
    return cart.items.reduce(
      (sum, item) => sum + (item.product.price.amount * item.quantity),
      0
    )
  },
  
  get isEmpty() {
    return cart.items.length === 0
  },
}

// Acciones
export const cartActions = {
  addItem(product: Product, quantity: number = 1) {
    const existingIndex = cart.items.findIndex(
      item => item.product.id.value === product.id.value
    )

    if (existingIndex !== -1) {
      setCart('items', existingIndex, 'quantity', q => q + quantity)
    } else {
      setCart('items', items => [...items, { product, quantity }])
    }
  },

  removeItem(productId: string) {
    setCart('items', items => 
      items.filter(item => item.product.id.value !== productId)
    )
  },

  updateQuantity(productId: string, quantity: number) {
    const index = cart.items.findIndex(
      item => item.product.id.value === productId
    )
    
    if (index !== -1) {
      if (quantity <= 0) {
        cartActions.removeItem(productId)
      } else {
        setCart('items', index, 'quantity', quantity)
      }
    }
  },

  clear() {
    setCart('items', [])
  },

  toggle() {
    setCart('isOpen', open => !open)
  },
}

export { cart }
```

---

## 5. Componente Avanzado (Organism)

```typescript
// src/ui/components/organisms/ProductGrid/ProductGrid.tsx
import { Component, For, Show, createSignal, createEffect } from 'solid-js'
import { ProductCard } from '@/ui/components/molecules/ProductCard'
import { Skeleton } from '@/ui/components/atoms/Skeleton'
import type { Product } from '@/core/domain/entities/Product'
import { gridStyles } from './ProductGrid.styles'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  onProductClick?: (product: Product) => void
  columns?: 2 | 3 | 4
}

export const ProductGrid: Component<ProductGridProps> = (props) => {
  const [visibleProducts, setVisibleProducts] = createSignal<Product[]>([])
  const columns = () => props.columns ?? 3

  // Lazy loading effect
  createEffect(() => {
    if (!props.isLoading) {
      // Simular carga progresiva
      const loadBatch = (startIndex: number) => {
        const batchSize = 6
        const batch = props.products.slice(startIndex, startIndex + batchSize)
        
        if (batch.length > 0) {
          setVisibleProducts(prev => [...prev, ...batch])
          
          if (startIndex + batchSize < props.products.length) {
            setTimeout(() => loadBatch(startIndex + batchSize), 100)
          }
        }
      }

      setVisibleProducts([])
      loadBatch(0)
    }
  })

  return (
    <div class={gridStyles({ columns: columns() })}>
      <Show
        when={!props.isLoading}
        fallback={
          <For each={Array(6).fill(null)}>
            {() => <Skeleton height="400px" />}
          </For>
        }
      >
        <For each={visibleProducts()}>
          {(product) => (
            <ProductCard
              product={product}
              onClick={() => props.onProductClick?.(product)}
            />
          )}
        </For>
      </Show>
    </div>
  )
}

// src/ui/components/organisms/ProductGrid/ProductGrid.styles.ts
import { recipe } from '@vanilla-extract/recipes'
import { tokens } from '@/ui/styles/tokens'

export const gridStyles = recipe({
  base: {
    display: 'grid',
    gap: tokens.spacing[6],
    width: '100%',
    '@media': {
      [`screen and (max-width: ${tokens.breakpoints.sm})`]: {
        gridTemplateColumns: '1fr',
      },
    },
  },
  variants: {
    columns: {
      2: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      3: {
        gridTemplateColumns: 'repeat(3, 1fr)',
        '@media': {
          [`screen and (max-width: ${tokens.breakpoints.lg})`]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
        },
      },
      4: {
        gridTemplateColumns: 'repeat(4, 1fr)',
        '@media': {
          [`screen and (max-width: ${tokens.breakpoints.xl})`]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
          [`screen and (max-width: ${tokens.breakpoints.lg})`]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
        },
      },
    },
  },
})
```

---

## 6. Integración con Astro

### 6.1 Página con Island Architecture

```astro
---
// src/pages/products/[id].astro
import BaseLayout from '@/layouts/BaseLayout.astro'
import { ProductDetail } from '@/ui/components/features/products/ProductDetail'
import { GetProduct } from '@/core/application/use-cases/products/GetProduct'
import { SupabaseProductRepository } from '@/core/infrastructure/repositories/SupabaseProductRepository'

const { id } = Astro.params

if (!id) {
  return Astro.redirect('/404')
}

// Dependency Injection
const productRepository = new SupabaseProductRepository()
const getProductUseCase = new GetProduct(productRepository)

// Server-side data fetching
const product = await getProductUseCase.execute({ id })

if (!product) {
  return Astro.redirect('/404')
}

const productProps = product.toPrimitives()

// SEO metadata
const title = `${productProps.name} | Mi Tienda`
const description = productProps.description.substring(0, 160)
const imageUrl = productProps.images[0] || '/default-product.jpg'
---

<BaseLayout title={title} description={description}>
  <Fragment slot="head">
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="product" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageUrl} />
    <meta property="product:price:amount" content={productProps.price.amount.toString()} />
    <meta property="product:price:currency" content={productProps.price.currency} />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={imageUrl} />
    
    <!-- Schema.org -->
    <script type="application/ld+json" set:html={JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": productProps.name,
      "description": productProps.description,
      "image": productProps.images,
      "offers": {
        "@type": "Offer",
        "price": productProps.price.amount,
        "priceCurrency": productProps.price.currency,
        "availability": productProps.stock > 0 
          ? "https://schema.org/InStock" 
          : "https://schema.org/OutOfStock"
      }
    })} />
  </Fragment>

  <!-- Componente Solid con hidratación client:load -->
  <ProductDetail 
    client:load 
    product={productProps}
  />
</BaseLayout>
```

### 6.2 API Endpoint

```typescript
// src/pages/api/products/[id].ts
import type { APIRoute } from 'astro'
import { GetProduct } from '@/core/application/use-cases/products/GetProduct'
import { SupabaseProductRepository } from '@/core/infrastructure/repositories/SupabaseProductRepository'

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Product ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Dependency Injection
    const repository = new SupabaseProductRepository()
    const useCase = new GetProduct(repository)

    const product = await useCase.execute({ id })

    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ data: product.toPrimitives() }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300, s-maxage=600'
        } 
      }
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params
    const body = await request.json()

    // Aquí iría la lógica de actualización
    // Validar con Zod, ejecutar caso de uso UpdateProduct, etc.

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update product' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
```

---

## 7. Testing Enterprise

### 7.1 Unit Tests (Vitest)

```typescript
// src/core/domain/entities/Product.test.ts
import { describe, it, expect } from 'vitest'
import { Product } from './Product'
import { Money } from '../value-objects/Money'
import { ProductId } from '../value-objects/ProductId'

describe('Product Entity', () => {
  describe('create', () => {
    it('should create a product with valid data', () => {
      const product = Product.create({
        name: 'Test Product',
        description: 'A test product',
        price: Money.create(99.99),
        stock: 10,
        images: ['image1.jpg'],
        category: 'electronics',
      })

      expect(product.name).toBe('Test Product')
      expect(product.price.amount).toBe(99.99)
      expect(product.isInStock).toBe(true)
    })
  })

  describe('decreaseStock', () => {
    it('should decrease stock when quantity is available', () => {
      const product = Product.create({
        name: 'Test Product',
        description: 'A test product',
        price: Money.create(99.99),
        stock: 10,
        images: [],
        category: 'electronics',
      })

      product.decreaseStock(3)
      
      expect(product.toPrimitives().stock).toBe(7)
    })

    it('should throw error when insufficient stock', () => {
      const product = Product.create({
        name: 'Test Product',
        description: 'A test product',
        price: Money.create(99.99),
        stock: 5,
        images: [],
        category: 'electronics',
      })

      expect(() => product.decreaseStock(10)).toThrow('Insufficient stock')
    })
  })
})

// src/core/application/use-cases/products/GetProduct.test.ts
import { describe, it, expect, vi } from 'vitest'
import { GetProduct } from './GetProduct'
import type { IProductRepository } from '@/core/domain/repositories/IProductRepository'
import { Product } from '@/core/domain/entities/Product'
import { Money } from '@/core/domain/value-objects/Money'

describe('GetProduct Use Case', () => {
  it('should return product when found', async () => {
    // Arrange
    const mockProduct = Product.create({
      name: 'Test Product',
      description: 'Description',
      price: Money.create(99.99),
      stock: 10,
      images: [],
      category: 'test',
    })

    const mockRepository: IProductRepository = {
      findById: vi.fn().mockResolvedValue(mockProduct),
      findAll: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }

    const useCase = new GetProduct(mockRepository)

    // Act
    const result = await useCase.execute({ id: 'test-id' })

    // Assert
    expect(result).toBe(mockProduct)
    expect(mockRepository.findById).toHaveBeenCalledOnce()
  })

  it('should return null when product not found', async () => {
    const mockRepository: IProductRepository = {
      findById: vi.fn().mockResolvedValue(null),
      findAll: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }

    const useCase = new GetProduct(mockRepository)
    const result = await useCase.execute({ id: 'nonexistent' })

    expect(result).toBeNull()
  })
})
```

### 7.2 Integration Tests

```typescript
// src/core/infrastructure/repositories/SupabaseProductRepository.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { SupabaseProductRepository } from './SupabaseProductRepository'
import { Product } from '@/core/domain/entities/Product'
import { Money } from '@/core/domain/value-objects/Money'

describe('SupabaseProductRepository Integration', () => {
  let repository: SupabaseProductRepository
  let testProduct: Product

  beforeAll(async () => {
    repository = new SupabaseProductRepository()
    
    testProduct = Product.create({
      name: 'Integration Test Product',
      description: 'Test description',
      price: Money.create(49.99),
      stock: 100,
      images: ['test.jpg'],
      category: 'test',
    })
  })

  afterAll(async () => {
    // Cleanup
    if (testProduct) {
      await repository.delete(testProduct.id)
    }
  })

  it('should save and retrieve a product', async () => {
    // Save
    const saved = await repository.save(testProduct)
    expect(saved.id).toBeDefined()

    // Retrieve
    const found = await repository.findById(saved.id)
    expect(found).not.toBeNull()
    expect(found?.name).toBe('Integration Test Product')
  })

  it('should filter products by category', async () => {
    const products = await repository.findAll({ category: 'test' })
    expect(products.length).toBeGreaterThan(0)
    expect(products.every(p => p.toPrimitives().category === 'test')).toBe(true)
  })
})
```

### 7.3 Component Tests

```typescript
// src/ui/components/atoms/Button/Button.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@solidjs/testing-library'
import { Button } from './Button'

describe('Button Component', () => {
  it('should render with default props', () => {
    render(() => <Button>Click me</Button>)
    const button = screen.getByText('Click me')
    expect(button).toBeInTheDocument()
  })

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(() => <Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByText('Click me')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('should be disabled when isLoading is true', () => {
    render(() => <Button isLoading>Loading</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(() => <Button disabled onClick={handleClick}>Disabled</Button>)
    
    const button = screen.getByText('Disabled')
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })
})
```

### 7.4 E2E Tests (Playwright)

```typescript
// tests/e2e/product-purchase.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Product Purchase Flow', () => {
  test('should complete full purchase flow', async ({ page }) => {
    // Navigate to product page
    await page.goto('/products/test-product-id')
    
    // Verify product details loaded
    await expect(page.locator('h1')).toContainText('Test Product')
    
    // Add to cart
    await page.click('button:has-text("Add to Cart")')
    
    // Verify cart badge updated
    await expect(page.locator('[data-testid="cart-badge"]')).toContainText('1')
    
    // Open cart
    await page.click('[data-testid="cart-button"]')
    
    // Verify product in cart
    await expect(page.locator('[data-testid="cart-item"]')).toBeVisible()
    
    // Proceed to checkout
    await page.click('button:has-text("Checkout")')
    
    // Fill checkout form
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="cardNumber"]', '4242424242424242')
    await page.fill('[name="expiry"]', '12/25')
    await page.fill('[name="cvc"]', '123')
    
    // Submit order
    await page.click('button:has-text("Place Order")')
    
    // Verify success
    await expect(page).toHaveURL(/\/order-confirmation/)
    await expect(page.locator('h1')).toContainText('Order Confirmed')
  })

  test('should handle out of stock products', async ({ page }) => {
    await page.goto('/products/out-of-stock-id')
    
    const addToCartButton = page.locator('button:has-text("Add to Cart")')
    await expect(addToCartButton).toBeDisabled()
    
    await expect(page.locator('text=Out of Stock')).toBeVisible()
  })
})
```

---

## 8. Configuración y Tooling

### 8.1 astro.config.mjs

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import solid from '@astrojs/solid-js'
import vercel from '@astrojs/vercel/serverless'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
  }),
  
  integrations: [
    solid(),
  ],
  
  vite: {
    plugins: [vanillaExtractPlugin()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      cssMinify: 'lightningcss',
    },
  },
  
  image: {
    domains: ['images.unsplash.com', 'cdn.example.com'],
    remotePatterns: [{ protocol: 'https' }],
  },
  
  experimental: {
    contentCollectionCache: true,
  },
})
```

### 8.2 tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/core/*": ["./src/core/*"],
      "@/ui/*": ["./src/ui/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 8.3 package.json Scripts

```json
{
  "name": "enterprise-astro-solid",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "clean": "rm -rf dist .astro node_modules/.vite",
    
    "lint": "eslint . --ext .ts,.tsx,.astro --max-warnings 0",
    "lint:fix": "eslint . --ext .ts,.tsx,.astro --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,astro,css,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,astro,css,json}\"",
    
    "type-check": "astro check",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    
    "prepare": "husky install",
    "precommit": "lint-staged"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/solid-js": "^4.0.0",
    "@astrojs/vercel": "^7.0.0",
    "solid-js": "^1.8.0",
    "@vanilla-extract/css": "^1.14.0",
    "@vanilla-extract/recipes": "^0.5.0",
    "zod": "^3.22.0",
    "@supabase/supabase-js": "^2.38.0"
  },
  "devDependencies": {
    "@vanilla-extract/vite-plugin": "^4.0.0",
    "@solidjs/testing-library": "^0.8.0",
    "@playwright/test": "^1.40.0",
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "@vitest/coverage-v8": "^1.0.0",
    "typescript": "^5.3.0",
    "eslint": "^8.55.0",
    "@typescript-eslint/parser": "^6.15.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "eslint-plugin-solid": "^0.13.0",
    "eslint-plugin-astro": "^0.31.0",
    "prettier": "^3.1.0",
    "prettier-plugin-astro": "^0.12.0",
    "husky": "^8.0.0",
    "lint-staged": "^15.2.0"
  },
  "lint-staged": {
    "*.{ts,tsx,astro}": ["eslint --fix", "prettier --write"],
    "*.{css,json,md}": ["prettier --write"]
  }
}
```

### 8.4 ESLint Configuration

```javascript
// eslint.config.js
import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import solidPlugin from 'eslint-plugin-solid'

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'solid': solidPlugin,
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
      }],
      
      // Solid.js
      'solid/reactivity': 'error',
      'solid/no-destructure': 'error',
      'solid/prefer-for': 'error',
      
      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]
```

### 8.5 Prettier Configuration

```javascript
// .prettierrc.cjs
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
```

---

## 9. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Check formatting
        run: npm run format:check
      
      - name: Type check
        run: npm run type-check

  test-unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  test-e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Build application
        run: npm run build
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

  build:
    needs: [lint-and-format, test-unit, test-e2e]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 10. Documentación y Convenciones

### 10.1 Convenciones de Nombres

```typescript
// ✅ CORRECTO

// Archivos y carpetas: kebab-case
// product-card.tsx
// use-cart.ts
// product-repository.ts

// Componentes: PascalCase
export const ProductCard: Component = () => {}
export class ProductRepository implements IProductRepository {}

// Funciones y variables: camelCase
const getUserById = (id: string) => {}
const productList = []

// Constantes: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRIES = 3

// Tipos e Interfaces: PascalCase con prefijo I para interfaces
interface IProductRepository {}
type ProductDTO = {}

// Enums: PascalCase
enum OrderStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
  Shipped = 'SHIPPED',
}

// Archivos de prueba: .test.ts o .spec.ts
// ProductCard.test.tsx
// GetProduct.spec.ts
```

### 10.2 Comentarios JSDoc

```typescript
/**
 * Retrieves a product by its unique identifier.
 * 
 * @param id - The unique identifier of the product
 * @returns A Promise that resolves to the Product or null if not found
 * @throws {ValidationError} If the ID format is invalid
 * 
 * @example
 * ```typescript
 * const product = await getProduct.execute({ id: '123' })
 * if (product) {
 *   console.log(product.name)
 * }
 * ```
 */
async execute(dto: GetProductDTO): Promise<Product | null> {
  // Implementation
}
```

### 10.3 Commits Convencionales

```bash
# Formato: <type>(<scope>): <subject>

feat(products): add product filtering by category
fix(cart): resolve quantity update bug
docs(readme): update installation instructions
style(button): improve hover animation
refactor(repository): extract common query logic
test(product): add unit tests for Product entity
chore(deps): update dependencies to latest versions
perf(images): optimize image loading strategy
```

---

## 11. Performance & Optimización

### 11.1 Code Splitting

```typescript
// src/ui/components/features/products/ProductDetail.tsx
import { Component, lazy, Suspense } from 'solid-js'

// Lazy load components pesados
const ImageGallery = lazy(() => import('@/ui/components/molecules/ImageGallery'))
const RelatedProducts = lazy(() => import('@/ui/components/organisms/RelatedProducts'))
const ReviewsSection = lazy(() => import('@/ui/components/organisms/ReviewsSection'))

export const ProductDetail: Component<Props> = (props) => {
  return (
    <div>
      <ProductInfo product={props.product} />
      
      <Suspense fallback={<Skeleton height="400px" />}>
        <ImageGallery images={props.product.images} />
      </Suspense>
      
      <Suspense fallback={<div>Loading reviews...</div>}>
        <ReviewsSection productId={props.product.id} />
      </Suspense>
      
      <Suspense fallback={<ProductGridSkeleton />}>
        <RelatedProducts category={props.product.category} />
      </Suspense>
    </div>
  )
}
```

### 11.2 Caching Strategy

```typescript
// src/shared/utils/cache.ts
export class CacheManager {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private readonly TTL = 5 * 60 * 1000 // 5 minutos

  get<T>(key: string): T | null {
    const cached = this.cache.get(key)
    
    if (!cached) return null
    
    const isExpired = Date.now() - cached.timestamp > this.TTL
    
    if (isExpired) {
      this.cache.delete(key)
      return null
    }
    
    return cached.data as T
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }

  invalidate(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }
}

export const cache = new CacheManager()

// src/core/infrastructure/repositories/CachedProductRepository.ts
import type { IProductRepository } from '@/core/domain/repositories/IProductRepository'
import { SupabaseProductRepository } from './SupabaseProductRepository'
import { cache } from '@/shared/utils/cache'

export class CachedProductRepository implements IProductRepository {
  constructor(private readonly repository: SupabaseProductRepository) {}

  async findById(id: ProductId): Promise<Product | null> {
    const cacheKey = `product:${id.value}`
    
    // Intenta obtener del cache
    const cached = cache.get<Product>(cacheKey)
    if (cached) return cached
    
    // Si no está en cache, busca en BD
    const product = await this.repository.findById(id)
    
    if (product) {
      cache.set(cacheKey, product)
    }
    
    return product
  }

  async save(product: Product): Promise<Product> {
    const saved = await this.repository.save(product)
    cache.set(`product:${saved.id.value}`, saved)
    return saved
  }

  async update(product: Product): Promise<Product> {
    const updated = await this.repository.update(product)
    cache.invalidate(`product:${product.id.value}`)
    return updated
  }

  // ... resto de métodos
}
```

### 11.3 Image Optimization

```astro
---
// src/components/OptimizedImage.astro
import { Image } from 'astro:assets'

interface Props {
  src: string
  alt: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

const { src, alt, width, height, loading = 'lazy', priority = false } = Astro.props
---

<Image
  src={src}
  alt={alt}
  width={width}
  height={height}
  loading={priority ? 'eager' : loading}
  decoding={priority ? 'sync' : 'async'}
  format="avif"
  fallbackFormat="webp"
  quality={85}
  densities={[1, 2]}
  sizes={`(max-width: 768px) 100vw, ${width}px`}
/>
```

---

## 12. Seguridad

### 12.1 Validación con Zod

```typescript
// src/shared/utils/validators/schemas.ts
import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters'),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  
  price: z.number()
    .positive('Price must be positive')
    .max(1000000, 'Price is too high'),
  
  stock: z.number()
    .int('Stock must be an integer')
    .nonnegative('Stock cannot be negative'),
  
  images: z.array(z.string().url())
    .min(1, 'At least one image is required')
    .max(5, 'Maximum 5 images allowed'),
  
  category: z.enum(['electronics', 'clothing', 'food', 'books'], {
    errorMap: () => ({ message: 'Invalid category' }),
  }),
})

export const CreateProductSchema = ProductSchema.omit({ id: true })

export const UpdateProductSchema = ProductSchema.partial().extend({
  id: z.string().uuid(),
})

// Uso en API endpoint
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    
    // Validar datos
    const validatedData = CreateProductSchema.parse(body)
    
    // Procesar...
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ 
          error: 'Validation failed',
          details: error.errors 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    throw error
  }
}
```

### 12.2 Sanitización de Inputs

```typescript
// src/shared/utils/sanitize.ts
import DOMPurify from 'isomorphic-dompurify'

export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href'],
  })
}

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remover < y >
    .substring(0, 1000) // Limitar longitud
}

// Uso en componente
const handleSubmit = (e: Event) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  const name = sanitizeInput(formData.get('name') as string)
  const description = sanitizeHtml(formData.get('description') as string)
  
  // Procesar datos sanitizados...
}
```

### 12.3 Rate Limiting

```typescript
// src/middleware/rateLimit.ts
import { defineMiddleware } from 'astro:middleware'

const requestCounts = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT = 100 // requests
const WINDOW_MS = 15 * 60 * 1000 // 15 minutos

export const rateLimit = defineMiddleware(async (context, next) => {
  const ip = context.clientAddress
  const now = Date.now()
  
  const record = requestCounts.get(ip)
  
  if (!record || now > record.resetAt) {
    requestCounts.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    })
    return next()
  }
  
  if (record.count >= RATE_LIMIT) {
    return new Response('Too many requests', { 
      status: 429,
      headers: {
        'Retry-After': String(Math.ceil((record.resetAt - now) / 1000)),
      },
    })
  }
  
  record.count++
  return next()
})
```

---

## 13. Monitoreo y Analytics

### 13.1 Error Tracking (Sentry)

```typescript
// src/shared/config/sentry.ts
import * as Sentry from '@sentry/astro'

Sentry.init({
  dsn: import.meta.env.PUBLIC_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.BrowserTracing({
      tracingOrigins: ['localhost', /^\//],
    }),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

// src/shared/utils/error-handler.ts
import * as Sentry from '@sentry/astro'

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly isOperational: boolean = true
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export const handleError = (error: unknown): void => {
  if (error instanceof AppError) {
    if (!error.isOperational) {
      Sentry.captureException(error)
    }
    console.error(`[${error.code}] ${error.message}`)
  } else {
    Sentry.captureException(error)
    console.error('Unexpected error:', error)
  }
}
```

### 13.2 Performance Monitoring

```typescript
// src/shared/utils/performance.ts
export class PerformanceMonitor {
  private marks = new Map<string, number>()

  start(label: string): void {
    this.marks.set(label, performance.now())
  }

  end(label: string): number {
    const start = this.marks.get(label)
    if (!start) {
      console.warn(`No start mark found for: ${label}`)
      return 0
    }

    const duration = performance.now() - start
    this.marks.delete(label)

    // Enviar a analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: label,
        value: Math.round(duration),
        event_category: 'Performance',
      })
    }

    return duration
  }

  measure(label: string, fn: () => void): void {
    this.start(label)
    fn()
    const duration = this.end(label)
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`)
  }

  async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label)
    const result = await fn()
    const duration = this.end(label)
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`)
    return result
  }
}

export const perfMonitor = new PerformanceMonitor()

// Uso
perfMonitor.start('fetch-products')
const products = await fetchProducts()
perfMonitor.end('fetch-products')
```

### 13.3 Analytics Integration

```typescript
// src/shared/utils/analytics.ts
interface AnalyticsEvent {
  category: string
  action: string
  label?: string
  value?: number
}

export class Analytics {
  track(event: AnalyticsEvent): void {
    if (typeof window === 'undefined') return

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      })
    }

    // Meta Pixel
    if (window.fbq) {
      window.fbq('track', event.action, {
        category: event.category,
        label: event.label,
      })
    }
  }

  trackPageView(path: string): void {
    if (typeof window === 'undefined') return

    if (window.gtag) {
      window.gtag('config', import.meta.env.PUBLIC_GA_ID, {
        page_path: path,
      })
    }
  }

  trackPurchase(orderId: string, value: number, currency: string = 'USD'): void {
    this.track({
      category: 'Ecommerce',
      action: 'purchase',
      label: orderId,
      value,
    })

    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value,
        currency,
      })
    }
  }

  trackAddToCart(productId: string, value: number): void {
    this.track({
      category: 'Ecommerce',
      action: 'add_to_cart',
      label: productId,
      value,
    })
  }
}

export const analytics = new Analytics()
```

---

## 14. Accessibility (A11y)

### 14.1 Componente Accesible

```typescript
// src/ui/components/atoms/Button/Button.tsx (versión accesible completa)
import { Component, JSX, splitProps, Show } from 'solid-js'
import { buttonStyles } from './Button.styles'

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  fullWidth?: boolean
  // A11y props
  'aria-label'?: string
  'aria-describedby'?: string
}

export const Button: Component<ButtonProps> = (props) => {
  const [local, attrs] = splitProps(props, [
    'variant',
    'size',
    'isLoading',
    'leftIcon',
    'rightIcon',
    'fullWidth',
    'children',
    'disabled',
    'aria-label',
    'aria-describedby',
  ])

  const isDisabled = () => local.disabled || local.isLoading

  return (
    <button
      {...attrs}
      class={buttonStyles({
        variant: local.variant ?? 'primary',
        size: local.size ?? 'md',
        fullWidth: local.fullWidth,
        isLoading: local.isLoading,
      })}
      disabled={isDisabled()}
      aria-busy={local.isLoading}
      aria-disabled={isDisabled()}
      aria-label={local['aria-label']}
      aria-describedby={local['aria-describedby']}
      role="button"
      tabIndex={isDisabled() ? -1 : 0}
    >
      <Show when={local.leftIcon}>
        <span class="button-icon-left" aria-hidden="true">
          {local.leftIcon}
        </span>
      </Show>
      
      <Show
        when={local.isLoading}
        fallback={local.children}
      >
        <span class="sr-only">Loading...</span>
        <Spinner size={local.size} aria-hidden="true" />
      </Show>
      
      <Show when={local.rightIcon}>
        <span class="button-icon-right" aria-hidden="true">
          {local.rightIcon}
        </span>
      </Show>
    </button>
  )
}
```

### 14.2 Skip Links y Landmarks

```astro
---
// src/layouts/BaseLayout.astro
---
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
</head>
<body>
  <!-- Skip Links -->
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
  
  <a href="#navigation" class="skip-link">
    Skip to navigation
  </a>

  <!-- Header con landmark -->
  <header role="banner">
    <nav id="navigation" role="navigation" aria-label="Main navigation">
      <!-- Navigation content -->
    </nav>
  </header>

  <!-- Main content con landmark -->
  <main id="main-content" role="main" tabindex="-1">
    <slot />
  </main>

  <!-- Footer con landmark -->
  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
</body>
</html>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  }

  .skip-link:focus {
    top: 0;
  }

  /* Screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
```

---

## 15. Internacionalización (i18n)

```typescript
// src/shared/i18n/index.ts
import { createI18nContext, I18nContext } from '@solid-primitives/i18n'

const dictionaries = {
  en: {
    product: {
      addToCart: 'Add to Cart',
      outOfStock: 'Out of Stock',
      price: 'Price',
      description: 'Description',
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      checkout: 'Proceed to Checkout',
    },
  },
  es: {
    product: {
      addToCart: 'Agregar al Carrito',
      outOfStock: 'Agotado',
      price: 'Precio',
      description: 'Descripción',
    },
    cart: {
      title: 'Carrito de Compras',
      empty: 'Tu carrito está vacío',
      total: 'Total',
      checkout: 'Proceder al Pago',
    },
  },
}

export type Dictionary = typeof dictionaries.en
export type Locale = keyof typeof dictionaries

export const createI18n = (locale: Locale = 'en') => {
  return createI18nContext(dictionaries[locale], locale)
}

// Uso en componente
import { useI18n } from '@/shared/i18n'

export const ProductCard: Component<Props> = (props) => {
  const [t] = useI18n()

  return (
    <div>
      <h3>{props.product.name}</h3>
      <p>{t('product.price')}: {props.product.price.format()}</p>
      <button>
        {props.product.isInStock 
          ? t('product.addToCart') 
          : t('product.outOfStock')
        }
      </button>
    </div>
  )
}
```

---

## 16. Deployment Checklist

### 16.1 Pre-deployment

```bash
# 1. Ejecutar todos los tests
npm run test
npm run test:e2e

# 2. Verificar linting y formato
npm run lint
npm run format:check

# 3. Verificar tipos
npm run type-check

# 4. Build de producción
npm run build

# 5. Analizar bundle size
npm run analyze

# 6. Lighthouse audit
npm run lighthouse

# 7. Verificar variables de entorno
# Asegurar que todas las env vars estén en Vercel/plataforma
```

### 16.2 Variables de Entorno

```bash
# .env.example
# Base
PUBLIC_APP_URL=https://example.com
NODE_ENV=production

# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...

# Analytics
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_GTM_ID=GTM-XXXXXXX
PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXX

# Payments
STRIPE_PUBLIC_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@example.com

# Monitoring
PUBLIC_SENTRY_DSN=https://...
SENTRY_AUTH_TOKEN=...

# Features
FEATURE_REVIEWS=true
FEATURE_RECOMMENDATIONS=true
```

---

## 17. Documentación de Arquitectura

### 17.1 ADR (Architecture Decision Records)

```markdown
# ADR 001: Adopción de Arquitectura Hexagonal

## Estado
Aceptado

## Contexto
Necesitamos una arquitectura que permita:
- Independencia del framework
- Fácil testabilidad
- Cambio de implementaciones sin afectar lógica de negocio

## Decisión
Implementar Arquitectura Hexagonal (Ports & Adapters)

## Consecuencias
**Positivas:**
- Lógica de negocio aislada
- Testing más simple
- Flexibilidad para cambiar infraestructura

**Negativas:**
- Mayor complejidad inicial
- Más archivos y abstracciones
- Curva de aprendizaje para el equipo

## Alternativas Consideradas
- Clean Architecture
- Layered Architecture
- MVC tradicional
```

### 17.2 Diagramas

```mermaid
# Incluir en docs/architecture/diagrams.md

graph TD
    A[UI Layer - Astro/Solid] --> B[Application Layer]
    B --> C[Domain Layer]
    B --> D[Infrastructure Layer]
    D --> E[(Database)]
    D --> F[External APIs]
    
    C -.-> B
    B -.-> A
```

---

## 18. Guía de Contribución

```markdown
# CONTRIBUTING.md

## Workflow de Desarrollo

1. **Crear rama desde develop**
   ```bash
   git checkout -b feature/nombre-feature
   ```

2. **Hacer commits siguiendo Conventional Commits**
   ```bash
   git commit -m "feat(products): add filter by price range"
   ```

3. **Push y crear Pull Request**
   - Título descriptivo
   - Descripción del cambio
   - Screenshots si aplica
   - Linked issues

4. **Code Review**
   - Mínimo 1 aprobación
   - CI debe pasar
   - No merge conflicts

5. **Merge a develop**
   - Squash and merge preferido
   - Delete branch después de merge

## Estándares de Código

- TypeScript strict mode
- ESLint sin warnings
- 80%+ test coverage para lógica de negocio
- Componentes deben tener PropTypes/interfaces
- Código comentado solo cuando sea complejo

## Checklist de PR

- [ ] Tests agregados/actualizados
- [ ] Documentación actualizada
- [ ] No hay console.logs
- [ ] Accesibilidad verificada
- [ ] Performance considerado
```

# Componentes de UI

Esta pasta contém componentes básicos de interface do usuário, principalmente da biblioteca shadcn/ui.

## Componentes

Inclui componentes fundamentais como:
- Botões, inputs, formulários
- Modais, diálogos, toasts
- Cards, tabs, acordeões
- Menus de navegação
- Tabelas, gráficos
- Badges, avatars, tooltips

## Uso

Estes são os blocos de construção básicos da interface e devem ser usados consistentemente em toda a aplicação para manter a coerência visual e de UX.

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MyComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Conteúdo do card</p>
        <Button>Clique Aqui</Button>
      </CardContent>
    </Card>
  );
};
```

## Componentes Especiais

- `sidebar.tsx`: Componente de barra lateral usado no painel administrativo
- `table.tsx`: Tabela com ordenação, filtros e paginação
- `chart.tsx`: Componentes de gráficos baseados em Recharts
- `carousel.tsx`: Carrossel de imagens e conteúdo

## Personalização

Os componentes shadcn/ui podem ser personalizados para seguir o tema da aplicação através dos arquivos de configuração do Tailwind, especialmente:

- `tailwind.config.js`: Cores, espaçamentos e outros valores do tema
- Variáveis CSS em `:root` para personalização de componentes específicos

## Cores da Marca

A aplicação utiliza as seguintes cores principais:
- `imperio-navy`: Azul escuro principal
- `imperio-red`: Vermelho para destaque e ações importantes
- Tons de cinza neutros para texto e backgrounds
- Cores semânticas para feedback (sucesso, erro, alerta)

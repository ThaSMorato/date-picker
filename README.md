# Date Picker

Este projeto é a implementação de um componente de seleção de data (Datepicker) usando React e Tailwind CSS. O Datepicker permite ao usuário selecionar uma data a partir de um calendário.

## Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias:

-	React.js (com Hooks)
-	Vite
-	TypeScript
-	Tailwind CSS
-	Radix UI React Popover
-	Lucide Icons
-	DayJS
-	clsx
-	Storybook
-	Jest

## Requisitos

Para rodar o projeto, você precisará ter instalado o Node.js (versão 20.11.1), além do npm ou pnpm, para a instalação de dependências.

## Instalação

Para instalar as dependências do projeto, clone o repositório e, dentro da pasta do projeto, execute:

```cli
npm install
# ou
pnpm run install
```

## Execução

Para visualizar a documentação do componente de seleção de data (Datepicker), use o comando:

```cli
npm run storybook
# ou
pnpm run storybook
```

## Testes

Para executar os testes de interface do usuário, use o comando:

```cli
npm run test
# ou
pnpm run test
```

A documentação do componente está disponível neste [link](https://thasmorato.github.io/date-picker/?path=/docs/simgle-components-button--docs), no GitHub Pages, que é automaticamente atualizado pelo GitHub Actions.

## Componentes de Calendário

Existem três tipos de calendários disponíveis:

-	`SimpleCalendar`: um calendário onde pode ser selecionada uma data.
-	`RangeCalendar`: um calendário onde pode ser selecionado um intervalo, ou seja, duas datas.
-	`OptionsCalendar`: um calendário que permite a seleção de um intervalo ou de uma única data, além de oferecer opções de seleção pré-definidas.

## Como Usar

Para usar os calendários em seu projeto, primeiro, importe os seguintes componentes:

```tsx
import { DatePickerRoot, DatePickerTrigger, OptionsCalendar, RangeCalendar, SimpleCalendar } from '@thasmorato/date-picker'
```

Em seguida, escolha o calendário que deseja usar (Simples, de Intervalo ou de Opções):

```tsx
<DatePickerRoot>
  <DatePickerTrigger>
    Open Calendar
  </DatePickerTrigger>
  <SimpleCalendar />
</DatePickerRoot>
```

Você pode usar o `asChild` no `DatePickerTrigger`, caso queira usar um componente próprio para abrir o calendário:

```tsx
<DatePickerRoot>
  <DatePickerTrigger asChild>
    <button>
    Open Calendar
    </button>
  </DatePickerTrigger>
  <SimpleCalendar />
</DatePickerRoot>
```

Os calendários recebem duas propriedades: `value` e `onChange`. O `valor` é uma instância de `Date`[], e `onChange` é uma função que recebe ou `string`[] (`SimpleCalendar` recebe `Date` e a função recebe `string`), nessa string, a data está no formato `YYYY-MM-DD`.
O botão `Select` irá chamar a função `onChange`, enquanto o botão `Cancel` limpa as datas selecionadas.

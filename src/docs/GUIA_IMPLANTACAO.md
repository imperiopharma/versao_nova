
# Guia de Implantação - Imperio Pharma

Este documento fornece instruções passo a passo para colocar a loja Imperio Pharma online utilizando o gerenciador de arquivos do seu provedor e o phpMyAdmin.

## Pré-requisitos

- Hospedagem web com suporte a PHP 7.4+ e MySQL/MariaDB
- Acesso ao painel de controle da hospedagem
- Acesso ao phpMyAdmin
- Arquivos da loja (código-fonte compilado)

## 1. Preparação dos Arquivos

Antes de fazer o upload para o servidor, certifique-se de que você tem os seguintes arquivos prontos:

1. Arquivos de build da aplicação React (pasta `dist` ou `build` gerada pelo comando `npm run build`)
2. Script SQL para criação do banco de dados (`imperio_pharma.sql`)
3. Arquivos de configuração do PHP (se aplicável)

## 2. Configuração do Banco de Dados

### 2.1. Acessando o phpMyAdmin

1. Faça login no painel de controle da sua hospedagem
2. Localize e acesse o phpMyAdmin
3. Entre com as credenciais fornecidas pelo seu provedor de hospedagem

### 2.2. Criando o Banco de Dados

1. No phpMyAdmin, clique na aba "Banco de Dados"
2. Crie um novo banco de dados chamado `imperio_pharma` (ou o nome que preferir)
3. Certifique-se de selecionar o conjunto de caracteres `utf8mb4_unicode_ci`

### 2.3. Importando a Estrutura e Dados

1. Selecione o banco de dados recém-criado na barra lateral
2. Clique na aba "Importar"
3. Clique em "Escolher arquivo" e selecione o arquivo `imperio_pharma.sql`
4. Role para baixo e clique em "Executar"

## 3. Upload dos Arquivos via Gerenciador de Arquivos

### 3.1. Acessando o Gerenciador de Arquivos

1. No painel de controle da sua hospedagem, localize o "Gerenciador de Arquivos" ou "File Manager"
2. Acesse a pasta pública do seu domínio (geralmente chamada `public_html`, `www` ou `htdocs`)

### 3.2. Fazendo Upload dos Arquivos

1. Se você deseja instalar em uma subpasta, crie-a (ex: `lojaapp`)
2. Dentro da pasta escolhida, clique em "Upload" ou arraste os arquivos da pasta `dist/build` para o gerenciador
3. Aguarde o upload completo de todos os arquivos

### 3.3. Configurando Permissões

1. Para a pasta de uploads, dê permissão 755:
   - Selecione a pasta `uploads` (ou equivalente)
   - Clique em "Permissões" ou "Chmod"
   - Defina para 755 (ou marque as caixas equivalentes)
   - Clique em "OK" ou "Salvar"

## 4. Configurando o Arquivo de Conexão

### 4.1. Localizando o Arquivo de Configuração

1. No gerenciador de arquivos, localize o arquivo `config.php` ou similar
2. Edite-o clicando com o botão direito e selecionando "Editar" ou "Code Editor"

### 4.2. Atualizando as Informações de Conexão

Atualize as seguintes informações:

```php
// Configurações do Banco de Dados
define('DB_HOST', 'localhost'); // Geralmente é localhost
define('DB_NAME', 'imperio_pharma'); // Nome do banco de dados criado
define('DB_USER', 'seu_usuario'); // Fornecido pelo provedor
define('DB_PASS', 'sua_senha'); // Fornecido pelo provedor

// URL da Loja
define('STORE_URL', 'https://seudominio.com.br'); // Substitua pelo seu domínio
```

3. Salve o arquivo

## 5. Configurando o .htaccess para Single-Page Application

Para que as rotas do React funcionem corretamente, crie ou edite o arquivo `.htaccess` na raiz do diretório:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

## 6. Configurações para Segurança

### 6.1. Configurando HTTPS

1. No painel de controle da hospedagem, localize a seção de SSL/TLS
2. Ative o SSL para seu domínio (muitas hospedagens oferecem Let's Encrypt gratuitamente)
3. Configure o redirecionamento de HTTP para HTTPS

### 6.2. Proteção de Diretórios Sensíveis

Crie um arquivo `.htaccess` na pasta `admin` ou outras pastas sensíveis:

```
# Protege o diretório de acesso direto
Options -Indexes
```

## 7. Validação da Instalação

### 7.1. Verificação do Front-end

1. Acesse seu site pelo navegador: `https://seudominio.com.br`
2. Verifique se a página inicial carrega corretamente
3. Navegue pelo site e teste as principais funcionalidades

### 7.2. Verificação do Painel Administrativo

1. Acesse o painel administrativo: `https://seudominio.com.br/admin`
2. Faça login com as credenciais padrão:
   - Usuário: `admin@imperiophrama.com.br`
   - Senha: `admin123`
3. **IMPORTANTE**: Altere a senha imediatamente após o primeiro login

## 8. Configurações Pós-Instalação

### 8.1. Configurações Gerais da Loja

1. No painel administrativo, acesse "Configurações"
2. Atualize as informações da loja:
   - Nome da loja
   - E-mail de contato
   - Telefone
   - Endereço
   - Logotipo

### 8.2. Configuração de E-mails

1. Configure os templates de e-mail em "Configurações > Templates"
2. Teste o envio de e-mails para garantir que estão funcionando

### 8.3. Configurações de Envio

1. Configure os métodos de envio disponíveis
2. Defina as regiões atendidas e valores de frete

## 9. Manutenção

### 9.1. Backup Regular

1. Faça backup do banco de dados semanalmente via phpMyAdmin:
   - Acesse o phpMyAdmin
   - Selecione o banco de dados
   - Clique na aba "Exportar"
   - Selecione "Personalizado" e inclua a estrutura e dados
   - Clique em "Executar"

2. Faça backup dos arquivos via gerenciador de arquivos:
   - Selecione todos os arquivos da loja
   - Clique em "Comprimir" ou "Zip"
   - Baixe o arquivo compactado

### 9.2. Atualizações

Para futuras atualizações do sistema:

1. Faça backup completo (banco de dados e arquivos)
2. Substitua os arquivos antigos pelos novos via gerenciador de arquivos
3. Execute scripts de atualização do banco de dados, se necessário

## Suporte Técnico

Em caso de problemas durante a instalação ou uso, entre em contato:

- Email: suporte@imperiophrama.com.br
- WhatsApp: (XX) XXXXX-XXXX

---

**IMPORTANTE**: Este guia presume que você já possui conhecimentos básicos de hospedagem web, gerenciamento de arquivos e banco de dados. Caso não se sinta confortável com essas tarefas, recomendamos contratar assistência técnica especializada.


<?php
/**
 * Arquivo de configuração do banco de dados e da aplicação
 * 
 * IMPORTANTE: Este arquivo deve ser protegido e não deve ser acessível publicamente
 * Substitua os valores de exemplo pelos valores reais do seu ambiente antes de usar
 */

// Configurações do banco de dados e da aplicação
$config = [
    'db' => [
        'host' => 'localhost',      // Endereço do servidor MySQL (geralmente é localhost)
        'name' => 'imperio_pharma', // Nome do banco de dados
        'user' => 'seu_usuario',    // Nome de usuário do banco de dados (ALTERAR)
        'pass' => 'sua_senha',      // Senha do banco de dados (ALTERAR)
        'charset' => 'utf8mb4',     // Charset para suporte a caracteres especiais incluindo emojis
        'port' => '3306'            // Porta padrão do MySQL (altere se necessário)
    ],
    'app' => [
        'name' => 'Imperio Pharma',            // Nome da aplicação
        'url' => 'https://seudominio.com.br',  // URL base da aplicação (ALTERAR)
        'version' => '1.0.0',                  // Versão da aplicação
        'timezone' => 'America/Sao_Paulo',     // Fuso horário do Brasil
        'debug' => false                       // Modo de depuração (true apenas em ambiente de desenvolvimento)
    ]
];

// Definir o fuso horário da aplicação
date_default_timezone_set($config['app']['timezone']);

// Ativar ou desativar exibição de erros com base no modo de depuração
if ($config['app']['debug']) {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', 0);
    ini_set('display_startup_errors', 0);
    error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT & ~E_WARNING);
}

// Impedir acesso direto a este arquivo
if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    header('HTTP/1.0 403 Forbidden');
    exit('Acesso negado');
}
?>

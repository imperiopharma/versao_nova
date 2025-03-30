
<?php
// Arquivo de configuração do banco de dados
// Este arquivo deve ser protegido e não deve ser acessível publicamente

// Configurações do banco de dados
$config = [
    'db' => [
        'host' => 'localhost',     // Endereço do servidor MySQL (geralmente é localhost)
        'name' => 'imperio_pharma', // Nome do banco de dados
        'user' => '',              // Nome de usuário do banco de dados (preencha aqui)
        'pass' => '',              // Senha do banco de dados (preencha aqui)
        'charset' => 'utf8'        // Charset para suporte a caracteres especiais
    ],
    'app' => [
        'name' => 'Imperio Pharma', // Nome da aplicação
        'url' => '',                // URL base da aplicação (preencha se necessário)
        'version' => '1.0.0'        // Versão da aplicação
    ]
];

// Impedir acesso direto a este arquivo
if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    header('HTTP/1.0 403 Forbidden');
    exit('Acesso negado');
}
?>

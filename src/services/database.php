
<?php
// Configurações do banco de dados
$db_host = 'localhost'; // Geralmente é localhost no MaxDomínios
$db_name = 'imperio_pharma'; // Nome do banco de dados que você criou
$db_user = ''; // Preencha com o usuário do banco de dados
$db_pass = ''; // Preencha com a senha do banco de dados

// Estabelecer conexão com o banco de dados
try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Erro de conexão: " . $e->getMessage());
}
?>

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190712141529 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('CREATE TABLE entreprise (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom_entreprise VARCHAR(255) NOT NULL, siret VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE TABLE formation (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, annee INTEGER NOT NULL)');
        $this->addSql('CREATE TABLE client (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, entreprise_id INTEGER DEFAULT NULL, nom VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, adresse VARCHAR(500) NOT NULL, code_postal INTEGER NOT NULL, email VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE INDEX IDX_C7440455A4AEAFEA ON client (entreprise_id)');
        $this->addSql('CREATE TABLE client_formation (client_id INTEGER NOT NULL, formation_id INTEGER NOT NULL, PRIMARY KEY(client_id, formation_id))');
        $this->addSql('CREATE INDEX IDX_AB60F1B019EB6921 ON client_formation (client_id)');
        $this->addSql('CREATE INDEX IDX_AB60F1B05200282E ON client_formation (formation_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP TABLE entreprise');
        $this->addSql('DROP TABLE formation');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE client_formation');
    }
}

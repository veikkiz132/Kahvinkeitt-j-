const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Kahvinkeittäjät-botin komennot
const commands = [
    new SlashCommandBuilder()
        .setName('kahvinkeittajat')
        .setDescription('Tietoa Kahvinkeittäjät-kanavasta ja tiimistä!'),
    new SlashCommandBuilder()
        .setName('maisteluvideot')
        .setDescription('Katso Kahvinkeittäjien maistelu- ja IRL-videot!'),
    new SlashCommandBuilder()
        .setName('ehdota_sisaltoa')
        .setDescription('Ehdota mitä StumblerX:n ja Veikkizin pitäisi maistaa tai kuvata!')
        .addStringOption(option =>
            option.setName('idea')
                .setDescription('Kirjoita ideasi tähän')
                .setRequired(true)
        )
].map(command => command.toJSON());

// Uusi token päivitettynä
const TOKEN = "MTU2NjgzMDc0NTg2MjAyMTEzMw.GEPdEC.Beiv70EYtI9sqd50qFRkE5Gc2YHOm2ivSli0es";

client.once('ready', async () => {
    console.log(`Kahvinkeittäjät-botti valmiina käyttäjänä ${client.user.tag}!`);

    const rest = new REST({ version: '10' }).setToken(TOKEN);
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        );
        console.log('Kahvinkeittäjät-botin komennot rekisteröity onnistuneesti!');
    } catch (error) {
        console.error('Virhe komentojen rekisteröinnissä:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'kahvinkeittajat') {
        const embed = new EmbedBuilder()
            .setTitle('☕ Kahvinkeittäjät - IRL & Maistelu')
            .setDescription(
                'Tervetuloa Kahvinkeittäjät-kanavan viralliselle Discord-botille!\n\n' +
                'Kanavasta vastaavat **StumblerX** ja **Veikkiz**. Täällä maistellaan herkkuja ja kuvataan rentoa sisältöä!'
            )
            .setColor(0x6F4E37)
            .addFields(
                { name: '👥 Tiimi', value: 'StumblerX & Veikkiz', inline: true },
                { name: '🎬 Teema', value: 'IRL, Maistelu & Vlogit', inline: true }
            )
            .setFooter({ text: 'Kahvinkeittäjät' });

        await interaction.reply({ embeds: [embed] });
    }
    else if (commandName === 'maisteluvideot') {
        const embed = new EmbedBuilder()
            .setTitle('🥤 Maistelu- & IRL-videot')
            .setDescription('Tässä on parhaita maisteluvideoita katsottavaksi:')
            .setColor(0xE67E22)
            .addFields(
                {
                    name: '🍕 Maistellaan Tarvasjokelaisia herkkuja - W/Veikkiz',
                    value: 'https://www.youtube.com/@StumblerxGaming',
                    inline: false
                }
            )
            .setFooter({ text: 'Kahvinkeittäjät YouTube' });

        await interaction.reply({ embeds: [embed] });
    }
    else if (commandName === 'ehdota_sisaltoa') {
        const idea = interaction.options.getString('idea');
        await interaction.reply(`💡 **Uusi idea Kahvinkeittäjille vastaanotettu!**\nStumblerX ja Veikkiz tsekkaavat tämän: "${idea}"`);
    }
});

client.login(TOKEN);
import asyncio
import discord
from discord.ext import commands

# Asetetaan botin oikeudet ja komento-etuliite (!)
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)


@bot.event
async def on_ready():
    print(f"Kahvibotti {bot.user.name} on valmiina keittämään kahvia!")


@bot.command(name="kahvi")
async def kahvitauko(ctx, minuuttia: int = 5):
    """Kutsuu kanavan jäsenet kahville määrätyn ajan kuluttua.

    Käyttö: !kahvi [minuutit] (esim. !kahvi 10)
    """
    await ctx.send(
        f"☕ **Kahvitauko kutsuttu!** Tauko alkaa {minuuttia} minuutin kuluttua. Ketkä ovat mukana?"
    )

    # Odotetaan määritetty aika (muutetaan minuutit sekunneiksi)
    await asyncio.sleep(minuuttia * 60)

    await ctx.send(
        f"⏰ {ctx.author.mention} ja muut! Kahvi on valmista, aika pitää tauko! ☕🎂"
    )


# Korvaa TÄHÄN_SINUN_TOKENISI omalla botin tokenilla
bot.run("MTU2NjgzMDc0NTg2MjAyMTEzMw.GlYyPi.N_aTY73UoxBwAxHNk3WXoioWKjD0VE6JZgaXDA")

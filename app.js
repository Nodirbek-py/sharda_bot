const Telegraf = require("telegraf");
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const WizardScene = require("telegraf/scenes/wizard");
const config = require("./config");
const { Router, Markup, Composer } = Telegraf;
const courseSelector = new Composer();

courseSelector.action("tech", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field = "π¨βπ» Texnologiya bakalavr darajasi";
    return ctx.wizard.next();
});

courseSelector.action("business", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field = "πΌ Biznes boshqaruvi bakalavr darajasi";
    return ctx.wizard.next();
});

courseSelector.action("comp", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field =
        "π» Kompyuter ilovalari bo'yicha aspirantura diplomi";
    return ctx.wizard.next();
});

courseSelector.action("skill", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field =
        "πͺ Malaka rivojlantirishni sertifikatlash kursi";
    return ctx.wizard.next();
});

courseSelector.action("eng_prac", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field = "π¬π§ Ingliz tili amaliy kursi";
    return ctx.wizard.next();
});

courseSelector.action("eng_prep", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field = "π¬π§ Ingliz tili tayyorlov kursi";
    return ctx.wizard.next();
});

// // // // // Everything starts from here // // // // // // //
// // // // // Everything starts from here // // // // // // //
// // // // // Everything starts from here // // // // // // //

const superWizard = new WizardScene(
    "super-wizard",
    (ctx) => {
        ctx.reply("Tilni tanlang / ΠΡΠ±Π΅ΡΠΈΡΠ΅ ΡΠ·ΡΠΊ", {
            reply_markup: {
                keyboard: [["π·πΊ", "πΊπΏ"]],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        });
        ctx.wizard.state.data = {};
        return ctx.wizard.next();
    },
    (ctx) => {
        console.log(ctx.message.text);
        ctx.wizard.state.data.lang = ctx.message.text;
        if (ctx.wizard.state.data.lang === "πΊπΏ") {
            setTimeout(() => {
                ctx.reply("Ism va familyanginz");
            }, 2000);
            ctx.reply("Kerakli bo'ladigan hujjatlarni topshiring");
            return ctx.wizard.next();
        } else if (ctx.wizard.state.data.lang === "π·πΊ") {
            setTimeout(() => {
                ctx.reply("ΠΠ°ΡΠ΅ ΠΈΠΌΡ ΠΈ ΡΠ°ΠΌΠΈΠ»ΠΈΡ");
            }, 2000);
            ctx.reply("ΠΡΠΏΡΠ°Π²ΡΡΠ΅ Π½Π΅ΠΎΠ±ΡΠΎΠ΄ΠΈΠΌΡΠ΅ Π΄ΠΎΠΊΡΠΌΠ΅Π½ΡΡ");
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        ctx.wizard.state.data.fullname = ctx.message.text;
        if (ctx.wizard.state.data.lang === "πΊπΏ") {
            ctx.reply("Passportni nusxasini jo'nating");
            return ctx.wizard.next();
        } else if (ctx.wizard.state.data.lang === "π·πΊ") {
            ctx.reply("ΠΡΠΏΡΠ°Π²ΡΡΠ΅ ΠΊΠΎΠΏΠΈΡ ΠΏΠ°ΡΠΏΠΎΡΡΠ°");
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        ctx.wizard.state.data.passport = ctx.message.photo[0].file_id;
        if (ctx.wizard.state.data.lang === "πΊπΏ") {
            ctx.reply("Telefon raqamingiz", {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: "π² Telefon raqamni berish",
                                request_contact: true,
                            },
                        ],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
            return ctx.wizard.next();
        } else if (ctx.wizard.state.data.lang === "π·πΊ") {
            ctx.reply("ΠΠ°Ρ Π½ΠΎΠΌΠ΅Ρ", {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: "π² ΠΠ°ΡΡ Π½ΠΎΠΌΠ΅Ρ ΡΠ΅Π»Π΅ΡΠΎΠ½Π°",
                                request_contact: true,
                            },
                        ],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        ctx.wizard.state.data.phone = ctx.message.contact.phone_number;
        if (ctx.wizard.state.data.lang === "πΊπΏ") {
            ctx.reply("Emailingiz");
            return ctx.wizard.next();
        } else if (ctx.wizard.state.data.lang === "π·πΊ") {
            ctx.reply("ΠΠ°Ρ email");
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        ctx.wizard.state.data.email = ctx.message.text;
        if (ctx.wizard.state.data.lang === "πΊπΏ") {
            ctx.reply(
                `
          Yo'nalishni tanlang
      ππππππππππππππ
          `,
                Markup.inlineKeyboard([
                    [
                        Markup.callbackButton(
                            "π¨βπ» Texnologiya bakalavr darajasi",
                            "tech"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "πΌ Biznes boshqaruvi bakalavr darajasi",
                            "business"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "π» Kompyuter ilovalari bo'yicha aspirantura diplomi",
                            "comp"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "πͺ Malaka rivojlantirishni sertifikatlash kursi",
                            "skill"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "π¬π§ Ingliz tili amaliy kursi ",
                            "eng_prac"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "π¬π§ Ingliz tili tayyorlov kursi",
                            "eng_prep"
                        ),
                    ],
                ]).extra()
            );
            return ctx.wizard.next();
        } else if (ctx.wizard.state.data.lang === "π·πΊ") {
            ctx.reply(
                `
      Yo'nalishni tanlang
  ππππππππππππππ
      `,
                Markup.inlineKeyboard([
                    [
                        Markup.callbackButton(
                            "π¨βπ» Texnologiya bakalavr darajasi",
                            "tech"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "πΌ Biznes boshqaruvi bakalavr darajasi",
                            "business"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "π» Kompyuter ilovalari bo'yicha aspirantura diplomi",
                            "comp"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "πͺ Malaka rivojlantirishni sertifikatlash kursi",
                            "skill"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "π¬π§ Ingliz tili amaliy kursi ",
                            "eng_prac"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "π¬π§ Ingliz tili tayyorlov kursi",
                            "eng_prep"
                        ),
                    ],
                ]).extra()
            );
        }
    },
    courseSelector,
    (ctx) => {
        console.log(ctx.wizard.state.data);
        ctx.reply(
            "Ro'yxatga olish yakunlandi, siz bilan tez orada aloqaga chiqamiz"
        );
        const botta = new Telegraf(config.token);
        const data = `
          Student Name: ${ctx.wizard.state.data.fullname}
          Phone number: ${ctx.wizard.state.data.phone}
          Email: ${ctx.wizard.state.data.email}
          Field: ${ctx.wizard.state.data.field}
        `;
        botta.telegram.sendPhoto(
            "-1001587806494",
            ctx.wizard.state.data.passport,
            { caption: data }
        );
        return ctx.scene.leave();
    }
);
const stage = new Stage([superWizard]);

const bot = new Telegraf(config.token);
bot.use(session());
bot.use(stage.middleware());
bot.command("start", (ctx) => {
    ctx.scene.enter("super-wizard");
    console.log(ctx.message);
});
bot.launch();

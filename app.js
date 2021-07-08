const Telegraf = require("telegraf");
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const WizardScene = require("telegraf/scenes/wizard");
const config = require("./config");
const { Router, Markup, Composer } = Telegraf;
const courseSelector = new Composer();

courseSelector.action("tech", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field = "👨‍💻 Texnologiya bakalavr darajasi";
    return ctx.wizard.next();
});

courseSelector.action("business", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field = "💼 Biznes boshqaruvi bakalavr darajasi";
    return ctx.wizard.next();
});

courseSelector.action("comp", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field =
        "💻 Kompyuter ilovalari bo'yicha aspirantura diplomi";
    return ctx.wizard.next();
});

courseSelector.action("skill", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field =
        "💪 Malaka rivojlantirishni sertifikatlash kursi";
    return ctx.wizard.next();
});

courseSelector.action("eng_prac", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field = "🇬🇧 Ingliz tili amaliy kursi";
    return ctx.wizard.next();
});

courseSelector.action("eng_prep", (ctx) => {
    ctx.answerCbQuery();
    ctx.wizard.state.data.field = "🇬🇧 Ingliz tili tayyorlov kursi";
    return ctx.wizard.next();
});

// // // // // Everything starts from here // // // // // // //
// // // // // Everything starts from here // // // // // // //
// // // // // Everything starts from here // // // // // // //

const superWizard = new WizardScene(
    "super-wizard",
    (ctx) => {
        ctx.reply("Tilni tanlang / Выберите язык", {
            reply_markup: {
                keyboard: [["🇷🇺", "🇺🇿"]],
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
        if (ctx.wizard.state.data.lang === "🇺🇿") {
            setTimeout(() => {
                ctx.reply("Ism va familyanginz");
            }, 2000);
            ctx.reply("Kerakli bo'ladigan hujjatlarni topshiring");
            return ctx.wizard.next();
        } else if (ctx.wizard.state.data.lang === "🇷🇺") {
            setTimeout(() => {
                ctx.reply("Ваше имя и фамилия");
            }, 2000);
            ctx.reply("Отправьте необходимые документы");
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        ctx.wizard.state.data.fullname = ctx.message.text;
        if (ctx.wizard.state.data.lang === "🇺🇿") {
            ctx.reply("Passportni nusxasini jo'nating");
            return ctx.wizard.next();
        } else if (ctx.wizard.state.data.lang === "🇷🇺") {
            ctx.reply("Отправьте копию паспорта");
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        ctx.wizard.state.data.passport = ctx.message.photo[0].file_id;
        if (ctx.wizard.state.data.lang === "🇺🇿") {
            ctx.reply("Telefon raqamingiz", {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: "📲 Telefon raqamni berish",
                                request_contact: true,
                            },
                        ],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
            return ctx.wizard.next();
        } else if (ctx.wizard.state.data.lang === "🇷🇺") {
            ctx.reply("Ваш номер", {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: "📲 Дать номер телефона",
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
        if (ctx.wizard.state.data.lang === "🇺🇿") {
            ctx.reply("Emailingiz");
            return ctx.wizard.next();
        } else if (ctx.wizard.state.data.lang === "🇷🇺") {
            ctx.reply("Ваш email");
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        ctx.wizard.state.data.email = ctx.message.text;
        if (ctx.wizard.state.data.lang === "🇺🇿") {
            ctx.reply(
                `
          Yo'nalishni tanlang
      👇👇👇👇👇👇👇👇👇👇👇👇👇👇
          `,
                Markup.inlineKeyboard([
                    [
                        Markup.callbackButton(
                            "👨‍💻 Texnologiya bakalavr darajasi",
                            "tech"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "💼 Biznes boshqaruvi bakalavr darajasi",
                            "business"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "💻 Kompyuter ilovalari bo'yicha aspirantura diplomi",
                            "comp"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "💪 Malaka rivojlantirishni sertifikatlash kursi",
                            "skill"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "🇬🇧 Ingliz tili amaliy kursi ",
                            "eng_prac"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "🇬🇧 Ingliz tili tayyorlov kursi",
                            "eng_prep"
                        ),
                    ],
                ]).extra()
            );
            return ctx.wizard.next();
        } else if (ctx.wizard.state.data.lang === "🇷🇺") {
            ctx.reply(
                `
      Yo'nalishni tanlang
  👇👇👇👇👇👇👇👇👇👇👇👇👇👇
      `,
                Markup.inlineKeyboard([
                    [
                        Markup.callbackButton(
                            "👨‍💻 Texnologiya bakalavr darajasi",
                            "tech"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "💼 Biznes boshqaruvi bakalavr darajasi",
                            "business"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "💻 Kompyuter ilovalari bo'yicha aspirantura diplomi",
                            "comp"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "💪 Malaka rivojlantirishni sertifikatlash kursi",
                            "skill"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "🇬🇧 Ingliz tili amaliy kursi ",
                            "eng_prac"
                        ),
                    ],
                    [
                        Markup.callbackButton(
                            "🇬🇧 Ingliz tili tayyorlov kursi",
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

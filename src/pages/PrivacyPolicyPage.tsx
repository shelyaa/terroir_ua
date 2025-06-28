export const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-7xl mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-2">Політика конфіденційності</h2>
      <div className="font-manrope">
        <p className="text-gray text-sm mb-2 font-medium">
          Останнє оновлення: 25.05.2025
        </p>
        <div className="text-sm font-medium">
          <p>
            Ця Політика конфіденційності описує, як сайт Terroir UA (далі —
            "ми", "наш сайт", "Компанія") збирає, використовує, зберігає та
            захищає особисті дані користувачів.
          </p>
          <p>
            Ми поважаємо ваше право на конфіденційність і дотримуємося вимог
            Закону України «Про захист персональних даних», а також
            загальноєвропейського регламенту GDPR (у разі обробки даних громадян
            ЄС).
          </p>
        </div>
      </div>
      <div className="my-4">
        <p className="text-2xl font-medium mb-2">1. Які дані ми збираємо?</p>
        <div className="space-y-2 font-manrope text-gray text-sm">
          <p>Ми можемо збирати наступні типи інформації:</p>
          <ul className="list-disc pl-6">
            <li>Ім’я, прізвище</li>
            <li>Контактні дані (телефон, email)</li>
            <li>Адреса доставки</li>
            <li>Дані платіжних транзакцій (не зберігаємо реквізити карток)</li>
            <li>IP-адреса, тип пристрою, cookies</li>
          </ul>
        </div>
      </div>
      <div className="my-4">
        <p className="text-2xl font-medium mb-2">
          2. Для чого ми використовуємо ваші дані?
        </p>
        <div className="space-y-2 font-manrope text-gray text-sm">
          <p>Ваші дані використовуються виключно з наступною метою:</p>
          <ul className="list-disc pl-6">
            <li>обробка та доставка замовлень;</li>
            <li>зв’язок з вами щодо замовлення або сервісу;</li>
            <li>
              надсилання новин або спеціальних пропозицій (лише за вашою
              згодою);
            </li>
            <li>поліпшення роботи сайту та сервісу.</li>
          </ul>
        </div>
      </div>
      <div className="my-4">
        <p className="text-2xl font-medium mb-2">
          3. Чи передаємо ми ваші дані третім сторонам?{" "}
        </p>
        <div className="space-y-2 font-manrope text-gray text-sm">
          <p>
            Ми не продаємо і не передаємо ваші особисті дані третім сторонам, за
            винятком:
          </p>
          <ul className="list-disc pl-6">
            <li>Служб доставки (для виконання вашого замовлення)</li>
            <li>Платіжних систем (для обробки оплати)</li>
            <li>
              Випадків, передбачених законом (на вимогу суду або правоохоронних
              органів)
            </li>
          </ul>
        </div>
      </div>
      <div className="my-4">
        <p className="text-2xl font-medium mb-2">4. Cookies</p>
        <div className="space-y-2 font-manrope text-gray text-sm">
          <p>
            Ми використовуємо cookies для зручності користування сайтом,
            аналітики трафіку та покращення функціоналу. Ви можете змінити
            налаштування файлів cookies у своєму браузері.
          </p>
        </div>
      </div>
      <div className="my-4">
        <p className="text-2xl font-medium mb-2">
          5. Як ми захищаємо ваші дані?
        </p>
        <div className="space-y-2 font-manrope text-gray text-sm">
          <p>Ми застосовуємо сучасні засоби безпеки для захисту ваших даних:</p>
          <ul className="list-disc pl-6">
            <li>Шифрування з’єднання (SSL)</li>
            <li>Захист бази даних</li>
            <li>Обмежений доступ до персональних даних всередині компанії</li>
          </ul>
        </div>
      </div>
      <div className="my-4">
        <p className="text-2xl font-medium mb-2">6. Ваші права</p>
        <div className="space-y-2 font-manrope text-gray text-sm">
          <p>Ви маєте право:</p>
          <ul className="list-disc pl-6">
            <li>знати, які дані ми зберігаємо;</li>
            <li>вимагати доступ, виправлення або видалення своїх даних;</li>
            <li>відкликати згоду на обробку персональних даних;</li>
            <li>подати скаргу до контролюючого органу.</li>
          </ul>
        </div>
      </div>
      <div className="my-4">
        <p className="text-2xl font-medium mb-2">7. Зміни до політики</p>
        <div className="space-y-2 font-manrope text-gray text-sm">
          <p>
            Ми можемо періодично оновлювати цю Політику. Усі зміни публікуються
            на цій сторінці з відповідною датою. Рекомендуємо час від часу
            переглядати її.
          </p>
        </div>
      </div>
      <div className="my-4">
        <p className="text-2xl font-medium mb-2">8. Контактна інформація</p>
        <div className="space-y-2 font-manrope text-gray text-sm">
          <ul>
            <li>Terroir UA</li>
            <li>Email: info@terroir.ua</li>
            <li>Телефон: +380 97 234 4321</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

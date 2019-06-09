import React, { Component } from 'react';
import picture from '../images/minions.gif';

class Contacts extends Component {
    render() {
        return(
            <div className="container">
                <div className="w-75 mx-auto mt-3">
                    <h2 className="mb-3">Зв'яжіться з нами</h2>
                    <p>Хочете привітатися? Є робоче питання? Тоді терміново пишіть нам на <a href="#"><span className="text-primary">press@travel.life</span></a>!</p>
                </div>
                <div class="text-center">
                    <img src={picture} className="img-thumbnail w-40 rounded" alt="travel_picture" />    
                </div>  
                <div className="w-75 mx-auto mt-3">
                    <h2 className="mb-3">Як стати нашим автором</h2>
                    <p>Якщо ви хочете приєднатися до нашої команди авторів та експертів і розповідати про класні місця, створюючи 
                        власті пости та рекомендації, переконайтесь, що до вас про це ще ніхто не писав. Ну і звичайно уважно 
                        подивіться наші формати. 
                    </p>
                    <p>Якщо все добре і ви - першовідкривач, пишіть нам на адресу <a href="#"><span className="text-primary">partner@travel.life</span></a>. </p>
                    <p>Пишіть нам про своїх друзів, багато і цікаво подорожуючих, краще всіх знаючих про місцеві лавочки,
                        маленькі галереї та місця для пікніка. Ми завжди придумаємо, що в них спитати. Та розповідайте їм 
                        про нас. Чим більше людей залучено в проект, тим цікавіше і глибше описаний навколишній світ. 
                    </p>
                    
                </div>
            </div>
        );
    }
}

export default Contacts;
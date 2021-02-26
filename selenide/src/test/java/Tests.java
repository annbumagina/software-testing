import org.junit.jupiter.api.Test;

import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.Condition.*;

public class Tests {
    private final String URL = "http://localhost:3000";

    @Test
    public void wrongLogin() {
        open(URL);
        $("#login").setValue("tom");
        $("#pass").setValue("jerry");
        $(".submitButton").click();
        $(".error").shouldHave(text("User with this login does not exist"));
    }

    @Test
    public void registerBad() {
        open(URL + "/register");
        $("#first").setValue("Zoey");
        $("#last").setValue("Clarke");
        $("#login").setValue("sing");
        $("#pass").setValue("sing");
        $(".submitButton").click();
        $(".error").shouldHave(text("Password too short"));
    }

    @Test
    public void generateText() throws InterruptedException {
        open(URL + "/register");
        $("#first").setValue("Zoey");
        $("#last").setValue("Clarke");
        $("#login").setValue("sing");
        $("#pass").setValue("singsing");
        $(".submitButton").click();
        $(".error").shouldHave(text("Successfully registered, you can log in now"));

        open(URL + "/text");
        $("#login").setValue("sing");
        $("#pass").setValue("singsing");
        $(".submitButton").click();
        $(".text").should(appear);

        $("#word").setValue("prismo");
        $("#submitWord").click();
        Thread.sleep(200);
        $("#genText").click();
        $(".text").shouldHave(text("prismo prismo"));
    }
}

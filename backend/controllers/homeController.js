//home related route

exports.home = async (req, res) => {
    res.status(200).send({
        success: true,
        greeting: "Hello from API V1",
    });
};
exports.about = async (req, res) => {
    res.status(200).send({
        message: "This is about section",
    });
};
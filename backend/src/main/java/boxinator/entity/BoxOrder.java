package boxinator.entity;

public class BoxOrder {
    private String name, country, colour;
    private double weight, cost;

    public BoxOrder() {
    }

    public BoxOrder(String name, String country, String colour, double weight, double cost) {
        this.name = name;
        this.country = country;
        this.colour = colour;
        this.weight = weight;
        this.cost = cost;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    @Override
    public String toString() {
        return "BoxOrder{" +
                "name='" + name + '\'' +
                ", country='" + country + '\'' +
                ", colour='" + colour + '\'' +
                ", weight=" + weight +
                ", cost=" + cost +
                '}';
    }
}

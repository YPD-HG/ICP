import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 100;
  currentValue := 300;
  Debug.print(debug_show(currentValue));

  stable var startTime = Time.now();
  startTime := Time.now();
  Debug.print(debug_show(startTime));

  let id = 234873120874; //we can not change value of id, since it is not var but id
  // Debug.print(debug_show(id));

  public func topUp(amount: Float){
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withDraw(amount: Float){
    let tempValue: Float = currentValue - amount; // After the colon the data type is defined,
    if(tempValue >= 0){                         //  we could have also done it in case of
      currentValue -= amount;                   // currentValue but since we are assigning it a value
      Debug.print(debug_show(currentValue));    // itself so it is not necessary!
    }
    else 
      Debug.print("Insufficient balance")
    
  };

  public query func checkBalance(): async Float{
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS  = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.001 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  }
}

class stackUsingQueue:
    def __init__(self):
        self.q1 = []
        self.q2 = []

    def push(self):
        value = int(raw_input("number : "))
        self.q1.append(value)
        print(self.q1)

    def pop(self):
        queueLen = len(self.q1)
        if not queueLen:
            print("stack is empty")
            return
        self.q2 = self.q1[0:queueLen-1]
        print("popped item : {}".format(str(self.q1.pop())))
        self.q1 = self.q2
        self.q2 = []
        print(self.q1)

    def switchCase(self, option):
        switch = {
            1: self.push,
            2: self.pop
        }
        func = switch.get(option)
        func()

    def main(self):
        while(1):
            print("1) list of number: ")
            print("2) pop the number from queue ")
            print("3) Exit: ")
            choice = int(raw_input("Enter your choice: "))
            if choice == 3:
                break
            else:
                self.switchCase(choice)

stack = stackUsingQueue()
stack.main()
